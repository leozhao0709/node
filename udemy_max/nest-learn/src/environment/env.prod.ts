import { envDefault } from './env.default';

export const envProd = {
  ...envDefault,
  ENV: 'production',
};
