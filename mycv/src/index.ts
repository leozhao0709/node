import { ConfigService, ConfigType } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import appConfig from './config/app.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app
    .get(ConfigService)
    .get<ConfigType<typeof appConfig>>('app');
  await app.listen(config?.port || 3000);
}
bootstrap();
