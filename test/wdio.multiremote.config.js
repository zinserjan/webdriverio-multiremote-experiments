require("babel-polyfill");
require("regenerator-runtime");
exports.config = {
  specs: [
    'test/runner/**'
  ],
  capabilities: {
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
  },
  sync: false,
  services: ['selenium-standalone'],
  framework: 'mocha',
  reporters: ['dot'],
  mochaOpts: {
    ui: 'bdd',
    compilers: ['js:babel-register'],
    require: ["babel-polyfill"]
  }
};
