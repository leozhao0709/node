import { Module } from '@nestjs/common';
import { ReportsModule } from './reports/reports.module.js';
import { UsersModule } from './users/users.module.js';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller.js';
import mikroConfig from './db/mikro-orm.config.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`env/.env.${process.env.NODE_ENV ?? 'development'}`],
    }),
    MikroOrmModule.forRoot(mikroConfig),
    ReportsModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
