describe("multiremote", () => {

  before(async() => {
    const command = async function () {
      await this.pause(500);
    };

    browser.addCommand("myCustomCommand2", command);
    browser.getInstances().forEach(function (browserName) {
      const instance = browser.select(browserName);
      instance.addCommand("myCustomCommand2", command);
    });
  });

  it("custom command called on browser should work", async() => {
    await browser.myCustomCommand2();
  });

  it("custom command called on browserA should work", async() => {
    await browserA.myCustomCommand2();
  });

  it("custom command called on browserB should work", async() => {
    await browserB.myCustomCommand2();
  });
});

