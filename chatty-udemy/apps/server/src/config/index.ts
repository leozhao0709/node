import path from 'path';
import { getDiffEnvConfig, loadEnv } from './util.js';
import { fileURLToPath } from 'url';
import _ from 'lodash-es';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// load this first!
loadEnv();

const configBase = {
  HOST: 'http://localhost',
  PORT: 5000,
  STATIC_PATH: path.resolve(__dirname, '../public'),
  KOA_BODY: {
    JSON_LIMIT: '50mb',
    FORM_LIMIT: '50mb',
  },

  // env
  DATABASE_URL: process.env.DATABASE_URL!,
};

export type Config = typeof configBase;

const config: Config = _.merge(configBase, getDiffEnvConfig());

export default config;
