import { multiremote } from "webdriverio";
import { start } from  "selenium-standalone";


jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;

describe("multiremote", () => {
  let multibrowser;
  let browser1;
  let browser2;
  let selenium;

  const url = "https://github.com/zinserjan/wdio-screenshot";

  beforeAll(async() => {
    selenium = await new Promise((resolve, reject) => {
      start((err, child) => {
        err ? reject(err) : resolve(child);
      })
    });
  });

  // Applies only to tests in this describe block
  beforeEach(async() => {
    multibrowser = multiremote({
      chrome1: {
        desiredCapabilities: {
          browserName: 'chrome'
        }
      },
      chrome2: {
        desiredCapabilities: {
          browserName: 'chrome'
        }
      }
    });

    await multibrowser.init();

    browser1 = multibrowser.select("chrome1");
    browser2 = multibrowser.select("chrome2");

    multibrowser.addCommand("openUrl", async function () {
      await this.url(url);
      await this.pause(500);
    });
  });

  afterEach(async() => {
    await multibrowser.end();
  });


  afterAll(async() => {
    selenium.kill();
  });

  test("custom command called on multibrowser should work", async() => {
    await multibrowser.openUrl();

    const browserState = await multibrowser.url();

    expect(browserState.chrome1.value).toBe(url);
    expect(browserState.chrome2.value).toBe(url);
  });

  test("custom command called on browser1 should work", async() => {
    await browser1.openUrl();

    const browserState1 = await browser1.url();
    const browserState2 = await browser2.url();

    expect(browserState1.value).toBe(url);
    expect(browserState2.value).not.toBe(url);
  });

  test("custom command called on browser2 should work", async() => {
    await browser2.openUrl();

    const browserState1 = await browser1.url();
    const browserState2 = await browser2.url();

    expect(browserState1.value).not.toBe(url);
    expect(browserState2.value).toBe(url);
  });
});

