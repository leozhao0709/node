const commonConfig = require('./jest.common');
const { merge } = require('webpack-merge');

module.exports = merge(commonConfig, {
  // preset: 'ts-jest/presets/default-esm',
  setupFilesAfterEnv: ['./jest.setup.ts'],
  testEnvironment: 'node',
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/tests/__mocks__/fileMock.ts',
    '^(\\.{1,2}/.*)\\.js$': '$1',
    [`^@app/(.*)`]: '<rootDir>/src/$1',
  },
  testMatch: [
    '<rootDir>/src/**/*.spec.(js|jsx|ts|tsx)',
    '<rootDir>/tests/**/*.(test|spec).(js|jsx|ts|tsx)',
  ],
});
