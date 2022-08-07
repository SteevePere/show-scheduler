const fs = require("fs");
const path = require("path");
const readline = require('readline');
const tmp = require("tmp-promise");
const Transform = require('stream').Transform;
const util = require('util');
const { execShellCommand } = require('./exec')

async function removeFileFirstLine(path) {
  const tmpFile = await tmp.file();
  return new Promise((resolve, reject) => {
    var rl = readline.createInterface({
      input: fs.createReadStream(path)
    });
    var output = fs.createWriteStream(tmpFile.path);
    var firstRemoved = false;

    rl.on('line', (line) => {
      if (!firstRemoved) {
        firstRemoved = true;
        return;
      }
      output.write(line + '\n');
    }).on('close', () => {
      fs.copyFileSync(tmpFile.path, path)
      return resolve();
    })
  })
}

/**
 * Get first line of a file.
 * @param {string} pathToFile 
 * @returns {Promise<string>}
 */
async function getFirstLine(pathToFile) {
  const readable = fs.createReadStream(pathToFile);
  const reader = readline.createInterface({ input: readable });
  const line = await new Promise((resolve) => {
    reader.on('line', (line) => {
      reader.close();
      resolve(line);
    });
  });
  readable.close();
  return line;
}

async function getCustomConflictResolver(source) {
  const fileFirstLine = await getFirstLine(source);
  if (fileFirstLine.startsWith("#$: ")) {
    return fileFirstLine.replace("#$: ", "");
  }
  if (fileFirstLine.startsWith("//$: ")) {
    return fileFirstLine.replace("//$: ", "");
  }
  return null;
}

async function handleConflict(source, destination) {
  const fileName = path.basename(source);
  const customConflictResolver = await getCustomConflictResolver(source);
  const tmpFile = customConflictResolver && await tmp.file({ postfix: path.extname(fileName) });

  if (tmpFile) {
    fs.copyFileSync(source, tmpFile.path);
    source = tmpFile.path;
    await removeFileFirstLine(source)
  }

  try {
    if (/.*\.(yaml|yml)$/g.test(fileName)) {
      await execShellCommand(
        customConflictResolver
          ? customConflictResolver.replace("$FILE_SOURCE", source).replace("$FILE_DESTINATION", destination)
          : `yq -P -i ". *+ load(\\"${source}\\")" "${destination}"`
      )
    } else if (/.*\.(json|jsonc)$/g.test(fileName)) {
      if (!fs.existsSync(destination)) {
        const destinationContent = await execShellCommand(`yq -o=json "." "${source}"`);
        fs.mkdirSync(path.dirname(destination), {
          recursive: true
        });
        fs.writeFileSync(destination, destinationContent)
      } else {
        await execShellCommand(
          customConflictResolver
            ? customConflictResolver.replace("$FILE_SOURCE", source).replace("$FILE_DESTINATION", destination)
            : `yq -o=json -i ". *+ load(\\"${source}\\")" "${destination}"`
        );
      }
    } else {
      throw new Error(`Can't handle conflict for file: ${source}`)
    }
  } catch (e) {
    throw e
  } finally {
    if (tmpFile) {
      await tmpFile.cleanup()
    }
  }
}

function copyFile(source, destination) {
  fs.mkdirSync(path.dirname(destination), {
    recursive: true
  });
  fs.copyFileSync(source, destination)
}

async function mergeFolders(source, destination) {
  const files = fs.readdirSync(source);

  await Promise.all(files.map(async (file) => {
    const srcFile = path.join(source, file);
    const destFile = path.join(destination, file);
    const fileStat = fs.lstatSync(srcFile)

    if (fileStat.isDirectory()) {
      await mergeFolders(srcFile, destFile)
    } else {
      if (path.extname(srcFile) === ".jsonc") {
        await handleConflict(srcFile, destFile.slice(0, -1));
      } else if (!fs.existsSync(destFile)) {
        copyFile(srcFile, destFile)
      } else {
        await handleConflict(srcFile, destFile);
      }
    }
  }))
}

module.exports = {
  mergeFolders
}
