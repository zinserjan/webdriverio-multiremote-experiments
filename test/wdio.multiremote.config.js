
exports.config = {
  specs: [
    'test/runner/**'
  ],
  capabilities: {
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
  },
  sync: false,
  services: ['selenium-standalone'],
  framework: 'mocha',
  reporters: ['dot'],
  mochaOpts: {
    ui: 'bdd',
    timeout: 120000,
    compilers: ['js:babel-register']
  }
};
