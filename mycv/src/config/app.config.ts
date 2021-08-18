import { registerAs } from '@nestjs/config';

const appConfig = registerAs('app', () => ({
  port: process.env.APP_PORT || 3000,
}));

export default appConfig;
