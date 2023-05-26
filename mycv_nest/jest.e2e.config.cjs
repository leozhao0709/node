const commonConfig = require('./jest.common.cjs');
const { merge } = require('webpack-merge');

module.exports = merge(commonConfig, {
  preset: 'ts-jest/presets/default-esm',
  setupFilesAfterEnv: ['./jest.setup.ts'],
  testEnvironment: 'node',
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.ts',
    '^(\\.{1,2}/.*)\\.js$': '$1',
    [`^@app/(.*)\\.js`]: '<rootDir>/src/$1',
  },
  testMatch: ['<rootDir>/tests/**/*.e2e-spec.(js|jsx|ts|tsx)'],
});
