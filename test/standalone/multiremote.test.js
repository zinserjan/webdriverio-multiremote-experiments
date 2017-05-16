import { multiremote } from "webdriverio";
import { start } from  "selenium-standalone";


jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;

describe("multiremote", () => {
  let browser;
  let browserA;
  let browserB;
  let selenium;

  beforeAll(async() => {
    selenium = await new Promise((resolve, reject) => {
      start((err, child) => {
        err ? reject(err) : resolve(child);
      })
    });
  });

  // Applies only to tests in this describe block
  beforeEach(async() => {
    browser = multiremote({
      browserA: {
        desiredCapabilities: {
          browserName: 'chrome'
        }
      },
      browserB: {
        desiredCapabilities: {
          browserName: 'chrome'
        }
      }
    });

    await browser.init();

    browserA = browser.select("browserA");
    browserB = browser.select("browserB");

    browser.addCommand("myCustomCommand", async function () {
      await this.pause(500);
    });
  });

  afterEach(async() => {
    await browser.end();
  });


  afterAll(async() => {
    selenium.kill();
  });

  test("custom command called on browser should work", async() => {
    await browser.myCustomCommand();
  });

  test("custom command called on browserA should work", async() => {
    await browserA.myCustomCommand();
  });

  test("custom command called on browserB should work", async() => {
    await browserB.myCustomCommand();
  });
});

