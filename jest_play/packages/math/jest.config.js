const baseConfig = require('../../config/frontend/jest.config');

module.exports = {
  ...baseConfig,
  setupFilesAfterEnv: ['./jest.setup.ts'],
};
