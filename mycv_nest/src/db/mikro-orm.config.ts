import { defineConfig } from '@mikro-orm/core';
import dotenv from 'dotenv';
import path from 'node:path';

dotenv.config({
  path: path.resolve(
    __dirname,
    `../../env/.env.${process.env.NODE_ENV ?? 'development'}`
  ),
});

export default defineConfig({
  entities: [path.resolve(__dirname, '../../dist/**/*.entity.js')],
  entitiesTs: [path.resolve(__dirname, '../../src/**/*.entity.ts')],
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT ?? '3306'),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  dbName: process.env.DB_NAME,
  debug:
    process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test',
  forceUtcTimezone: true,

  migrations: {
    path: path.resolve(__dirname, '../../dist/db/migrations'),
    pathTs: path.resolve(__dirname, '../../src/db/migrations'),
    emit: 'ts',
  },

  seeder: {
    path: path.resolve(__dirname, '../../dist/db/seeders'), // path to the folder with seeders
    pathTs: path.resolve(__dirname, '../../src/db/seeders'), // path to the folder with TS seeders (if used, we should put path to compiled files in `path`)
    defaultSeeder: 'DatabaseSeeder', // default seeder class name
    glob: '!(*.d).{js,ts}', // how to match seeder files (all .js and .ts files, but not .d.ts)
    emit: 'ts', // seeder generation mode
    fileName: (className: string) => className, // seeder file naming convention
  },
});
