const cmd = require("node-cmd");

const fs = require("fs");

let fileListPath = "./sides"; // Path of the scenario files

let logListPath = "./logs"; // Path of the log files

let fileList = [];

let browserList = [];

let successLogList = [];

let failLogList = [];

let count = 0;

function testUnit(file, browser) {
  return new Promise(function(resolve, reject) {
    cmd.get(`selenium-side-runner -c "browserName=${browser}" ${fileListPath}/${file}`, function(error, success, stderr) {
      if (error) {
        failLogList.push(error);
      } else {
        successLogList.push(browser, success, stderr);
      }
      count++;
      if (fileList[count]) {
        // Run recursively and synchronously.
        testUnit(fileList[count], browser).then(() => {
          resolve();
        });
      } else {
        resolve();
      }
    });
  });
}

async function start() {
  try {
    fileList = fs.readdirSync(fileListPath);
    for (var i in browserList) {
      count = 0;
      await testUnit(fileList[count], browserList[i]); // // Run synchronously.
    }
    createLogFiles();
  } catch (error) {
    throw new Error(error);
  }
}

function createLogFiles() {
  !fs.existsSync(logListPath) && fs.mkdirSync(logListPath);
  fs.writeFile(`${logListPath}/successLogList.txt`, successLogList.join("\n"), function(err) {});
  fs.writeFile(`${logListPath}/failLogList.txt`, failLogList.join("\n"), function(err) {});
}

function setBrowserList(v) {
  browserList = v;
}

function setFilePath(v) {
  fileListPath = v;
}

function setLogPath(v) {
  logListPath = v;
}

module.exports = {
  setBrowserList,
  setFilePath,
  setLogPath,
  start
};
