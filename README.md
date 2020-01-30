# simple-selenium-tester

SIMPLE Selenium UI Tester

## 1. First install the browser driver.

- npm install -g chromedriver
- npm install -g geckodriver
- npm install -g edgedriver (Windows environment.)
- npm install -g iedriver (Windows environment.)

## 2. Just use it.

> Specify the folder where logs will be stored and the folder containing the test scenario files (.side).

    const simple = require("simple-selenium-tester");
    simple.setFilePath("./file");
    simple.setLogPath("./logs");
    simple.start();
