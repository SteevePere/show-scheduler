
const path = require("path");
const fs = require("fs");
const yurnalist = require("yurnalist");
const convertCase = require("js-convert-case");

const { name: projectName } = require('../package.json')

const { mergeFolders } = require('./utils/merge-folders');
const { snapshotFolder } = require('./utils/snapshot-folder');
const { execShellCommand } = require('./utils/exec');
const { searchAndReplace } = require('./utils/search-replace');

function displayUsage() {
  console.log("Usage: yarn create-app TEMPLATE_NAME APP_NAME");
}

const spinner = yurnalist.activity();

(async function () {
  spinner.tick('Loading...');
  const templateName = process.argv[2];
  const appName = process.argv[3];

  if (!templateName || !appName) {
    displayUsage();
    return process.exit(1);
  }

  const templatePath = path.resolve(path.join('.templates', templateName));

  if (!fs.existsSync(templatePath)) {
    console.log(`Template '${templatePath}' does not exist in '.templates' directory.`);
    displayUsage();
    return process.exit(1);
  }

  spinner.tick('Preparing...');
  const templateSnapshot = await snapshotFolder(templatePath);
  await searchAndReplace(templateSnapshot.path, 'app-name', appName);
  await searchAndReplace(templateSnapshot.path, 'APP_NAME', convertCase.toUpperCase(appName));
  await searchAndReplace(templateSnapshot.path, 'scheduler', projectName);
  await searchAndReplace(templateSnapshot.path, 'PROJECT_NAME', convertCase.toUpperCase(projectName));

  spinner.tick('Applying...');
  const projectPath = path.resolve("./");
  await mergeFolders(templateSnapshot.path, projectPath);
  await templateSnapshot.cleanup();

  spinner.tick('Installing modules...');
  await execShellCommand("yarn install");
  await execShellCommand("yarn lerna bootstrap");
})().catch(console.error).finally(() => spinner.end());
