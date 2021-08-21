import { ConfigType, registerAs } from '@nestjs/config';

const appConfig = registerAs('app', () => ({
  port: process.env.APP_PORT || 3000,
}));

export type AppConfig = ConfigType<typeof appConfig>;

export default appConfig;
