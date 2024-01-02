import { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  clearMocks: true,
  testPathIgnorePatterns: ['mocks', 'node_modules'],
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/tests/__mocks__/fileMock.ts',
    '\\.(css|less|scss)$': 'identity-obj-proxy',
  },
};

export default config;
