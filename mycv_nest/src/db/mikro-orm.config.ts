import { defineConfig } from '@mikro-orm/core';
import dotenv from 'dotenv';
// import path from 'node:path';
// import { fileURLToPath } from 'node:url';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// dotenv.config({
//   path: path.resolve(
//     __dirname,
//     `../../env/.env.${process.env.NODE_ENV ?? 'development'}`
//   ),
// });

dotenv.config({
  path: `./env/.env.${process.env.NODE_ENV ?? 'development'}`,
});

export default defineConfig({
  entities: ['./dist/**/*.entity.js'],
  entitiesTs: ['./src/**/*.entity.ts'],
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT ?? '3306'),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  dbName: process.env.DB_NAME,
  debug: process.env.NODE_ENV !== 'production',
  forceUtcTimezone: true,

  // migrations: {
  //   path: './dist/db/migrations',
  //   pathTs: 'src/db/migrations',
  //   emit: 'ts',
  // },

  // seeder: {
  //   path: './dist/db/seeders', // path to the folder with seeders
  //   pathTs: './src/db/seeders', // path to the folder with TS seeders (if used, we should put path to compiled files in `path`)
  //   defaultSeeder: 'DatabaseSeeder', // default seeder class name
  //   glob: '!(*.d).{js,ts}', // how to match seeder files (all .js and .ts files, but not .d.ts)
  //   emit: 'ts', // seeder generation mode
  //   fileName: (className: string) => className, // seeder file naming convention
  // },
});
