/**
 * Executes a shell command and return it as a Promise.
 * @param cmd {string}
 * @return {Promise<string>}
 */
 function execShellCommand(cmd, silent = true) {
  const exec = require('child_process').exec;
  const log = (...args) => !silent && console.log(...args);
  return new Promise((resolve, reject) => {
    log(`Exec: ${cmd}`);
    exec(cmd, (error, stdout, stderr) => {
      log(stdout);
      if (error) {
        log(stderr);
        reject(stderr);
      }
      resolve(stdout);
    });
  });
}

module.exports = {
  execShellCommand
}
