import { envProd } from './env.prod';
import { envTest } from './env.test';
import { envDefault } from './env.default';

let env = envDefault;

switch (process.env.NODE_ENV) {
  case 'production':
    env = envProd;
    break;
  case 'test':
    env = envTest;
  default:
    break;
}

// if process.env provided, then we need rewrite the config file.
for (const key in env) {
  if (process.env.hasOwnProperty(key)) {
    env[key] = process.env[key];
  }
}

export const environment = env;
