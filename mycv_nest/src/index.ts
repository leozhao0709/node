import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const port = configService.get<number>('SERVER_PORT') ?? 3000;

  await app.listen(port);
}

Date.prototype.toJSON = function () {
  dayjs.extend(utc);

  return dayjs(this).utc().format('YYYY/MM/DD HH:mm:ss');
};

bootstrap();
