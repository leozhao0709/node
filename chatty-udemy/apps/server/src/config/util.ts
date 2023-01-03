import path from 'node:path';
import { fileURLToPath } from 'node:url';
import configDev from './config.dev.js';
import configProd from './config.prod.js';
import configTest from './config.test.js';
import dotenv from 'dotenv';
import { Config } from './index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const loadEnv = () => {
  let envFileName;
  switch (process.env.NODE_ENV) {
    case 'production':
      // prod should not use env file
      break;
    case 'test':
      envFileName = '.env.test';
      break;
    default:
      envFileName = '.env.dev';
      break;
  }

  if (process.env.NODE_ENV !== 'production') {
    dotenv.config({
      path: path.resolve(__dirname, `../../env/${envFileName}`),
    });
  }
};

export const getDiffEnvConfig = () => {
  switch (process.env.NODE_ENV) {
    case 'production':
      return configProd;
    case 'test':
      return configTest;
    default:
      return configDev;
  }
};
