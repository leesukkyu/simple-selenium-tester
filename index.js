const cmd = require("node-cmd");

const fs = require("fs");

let fileListPath = "./sides"; // Path of the scenario files

let logListPath = "./logs"; // Path of the log files

let fileList = [];

let count = 0;

let successLogList = [];

let failLogList = [];

function testUnit(file) {
  cmd.get(
    // run selenium-side-runner
    `selenium-side-runner -c "browserName=firefox" ${fileListPath}/${file}`,
    function(error, success, stderr) {
      if (error) {
        failLogList.push(error);
      } else {
        successLogList.push(success, stderr);
      }
      count++;
      if (fileList[count]) {
        testUnit(fileList[count]);
      } else {
        !fs.existsSync(logListPath) && fs.mkdirSync(logListPath);
        fs.writeFile(`${logListPath}/successLogList.txt`, successLogList.join("\n"), function(err) {
          console.log("");
        });
        fs.writeFile(`${logListPath}/failLogList.txt`, failLogList.join("\n"), function(err) {
          console.log("");
        });
      }
    }
  );
}

function start() {
  try {
    count = 0;
    fileList = fs.readdirSync(fileListPath);
    testUnit(fileList[count]);
  } catch (error) {
    throw new Error(error);
  }
}

function setFilePath(v) {
  fileListPath = v;
}

function setLogPath(v) {
  logListPath = v;
}

module.exports = {
  setFilePath,
  setLogPath,
  start
};
