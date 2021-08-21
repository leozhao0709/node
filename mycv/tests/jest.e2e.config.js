const jestConfig = require('../jest.config.js');

module.exports = {
  ...jestConfig,
  setupFilesAfterEnv: ['./jest.e2e.setup.js'],
  testRegex: '.e2e-spec.ts$',
};
