const tmp = require('tmp-promise');
const { execShellCommand } = require('./exec');

async function snapshotFolder(source) {
  const snapshotFolder = await tmp.dir({ unsafeCleanup: true });
  await execShellCommand(`rsync -a --delete "${source}/" "${snapshotFolder.path}/"`);
  return snapshotFolder;
}

module.exports = {
  snapshotFolder
}
