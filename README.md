# simple-selenium-tester

SIMPLE Selenium UI Tester

## 0. Install simple-selenium-tester

- npm install --save-dev simple-selenium-tester

## 1. First install the browser driver.

- npm install -g chromedriver
- npm install -g geckodriver
- npm install -g edgedriver (Windows environment.)
- npm install -g iedriver (Windows environment.)

## 2. Just use it.

> Specify the folder where logs will be stored and the folder containing the test scenario files (.side).

    const simple = require("simple-selenium-tester");
    simple.setBrowserList(["chrome", "firefox", "internet explorer", "edge", "safari"]);
    simple.setFilePath("./file");
    simple.setLogPath("./logs");
    simple.start();

## +@ You can get a side file simply by doing this.

- Install selenium IDE, a chrome extension.
- Write a test scenario and save the file. It takes less than 5 minutes.
