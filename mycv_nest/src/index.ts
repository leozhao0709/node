import { NestFactory } from '@nestjs/core';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module.js';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js';
import { MikroORM } from '@mikro-orm/core';
import { ConfigService } from '@nestjs/config';

async function checkDb(app: INestApplication) {
  await app.get(MikroORM).getSchemaGenerator().ensureDatabase();
  if (
    (await app.get(MikroORM).getMigrator().getPendingMigrations()).length > 0
  ) {
    throw Error('Need run migration first');
  }
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  checkDb(app);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  const configService = app.get(ConfigService);
  const port = configService.get<number>('SERVER_PORT') ?? 3000;

  await app.listen(port);
}

Date.prototype.toJSON = function () {
  dayjs.extend(utc);

  return dayjs(this).utc().format('YYYY/MM/DD HH:mm:ss');
};

bootstrap();
