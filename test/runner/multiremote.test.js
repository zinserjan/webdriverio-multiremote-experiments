describe("multiremote", () => {
  const multibrowser = browser;
  let browser1;
  let browser2;
  const url = "https://github.com/zinserjan/wdio-screenshot";


  // Applies only to tests in this describe block
  before(async() => {
    browser1 = multibrowser.select("chrome1");
    browser2 = multibrowser.select("chrome2");

    multibrowser.addCommand("openUrl", async function () {
      await this.url(url);
      await this.pause(500);
    });
  });

  it("custom command called on multibrowser should work", async() => {
    await multibrowser.openUrl();

    const browserState = await multibrowser.url();

    // expect(browserState.chrome1.value).toBe(url);
    // expect(browserState.chrome2.value).toBe(url);
  });

  it("custom command called on browser1 should work", async() => {
    await browser1.openUrl();

    const browserState1 = await browser1.url();
    const browserState2 = await browser2.url();

    // expect(browserState1.value).toBe(url);
    // expect(browserState2.value).not.toBe(url);
  });

  it("custom command called on browser2 should work", async() => {
    await browser2.openUrl();

    const browserState1 = await browser1.url();
    const browserState2 = await browser2.url();

    // expect(browserState1.value).not.toBe(url);
    // expect(browserState2.value).toBe(url);
  });
});

