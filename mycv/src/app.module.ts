import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { getEnvFilePath, getConfiguration } from './config';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';

@Module({
  controllers: [AppController],
  imports: [
    ConfigModule.forRoot({
      envFilePath: getEnvFilePath(),
      load: getConfiguration(),
      isGlobal: true,
      cache: true,
    }),
    UsersModule,
    ReportsModule,
  ],
})
export class AppModule {}
