import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MikroORM } from '@mikro-orm/core';
import { AppModule } from '@app/app.module';
import { DatabaseSeeder } from '@app/db/seeders/DatabaseSeeder';

export let app: INestApplication;

const setupDb = async (app: INestApplication) => {
  const orm = app.get(MikroORM);
  const seeder = orm.getSeeder();
  await orm.getSchemaGenerator().refreshDatabase();
  await seeder.seed(DatabaseSeeder);
};

const cleanupDb = async (app: INestApplication) => {
  const orm = app.get(MikroORM);
  await orm.getSchemaGenerator().clearDatabase();
};

beforeEach(async () => {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  app = moduleFixture.createNestApplication();

  await setupDb(app);

  await app.init();
});

afterEach(async () => {
  await cleanupDb(app);
  await app.close();
});
