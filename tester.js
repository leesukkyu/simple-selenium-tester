const cmd = require("node-cmd");

const fs = require("fs");

const SIDE_LIST_PATH = "./sides"; // Path of the scenario files
const LOG_PATH = "./logs"; // Path of the log files

const list = fs.readdirSync(SIDE_LIST_PATH);

let count = 0;

let successLog = [];
let failLog = [];

function testUI(file) {
  cmd.get(
    // run selenium-side-runner
    `selenium-side-runner -c "browserName=firefox" ${SIDE_LIST_PATH}/${file}`,
    function(error, success, stderr) {
      if (error) {
        failLog.push(error);
      } else {
        successLog.push(success, stderr);
      }
      count++;
      if (list[count]) {
        testUI(list[count]);
      } else {
        fs.writeFile(`${LOG_PATH}/successLog.txt`, successLog.join("\n"), function(err) {
          console.log("");
        });
        fs.writeFile(`${LOG_PATH}/failLog.txt`, failLog.join("\n"), function(err) {
          console.log("");
        });
      }
    }
  );
}

function start() {
  count = 0;
  testUI(list[count]);
}

start();
