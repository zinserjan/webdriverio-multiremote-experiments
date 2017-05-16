describe("multiremote", () => {
  // Applies only to tests in this describe block
  before(async() => {
    browser.addCommand("myCustomCommand", async function () {
      await this.pause(500);
    });
  });

  it("custom command called on browser should work", async() => {
    await browser.myCustomCommand();
  });

  it("custom command called on browserA should work", async() => {
    await browserA.myCustomCommand();
  });

  it("custom command called on browserB should work", async() => {
    await browserB.myCustomCommand();
  });
});

