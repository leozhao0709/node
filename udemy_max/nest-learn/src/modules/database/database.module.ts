import { Module, Global, NestModule, RequestMethod } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as path from 'path';

const dbOptions: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: 'node_complete',
  entities: [
    path.resolve(
      path.dirname(process.mainModule.filename),
      './**/*.entity{.ts,.js}',
    ),
  ],
  synchronize: true,
  logging: true,
};

@Global()
@Module({
  imports: [TypeOrmModule.forRoot(dbOptions)],
})
export class DatabaseModule {}
