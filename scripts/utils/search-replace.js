const { execShellCommand } = require('./exec');

async function searchAndReplace(path, from, to) {
  while (true) {
    try {
      await execShellCommand(`LC_ALL=C find "${path}" -type d -exec rename ''s/${from}/${to}/g'' {} \\;`)
      await execShellCommand(`LC_ALL=C find "${path}" -type f -exec rename ''s/${from}/${to}/g'' {} \\;`)
      await execShellCommand(`LC_ALL=C find "${path}" -type f -exec sed -i '' -e ''s/${from}/${to}/g'' {} \\;`)
      break;
    } catch(e) {}
  }
}

module.exports = {
  searchAndReplace
}
