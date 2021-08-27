import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import getConfiguration from './config';
import { APP_PIPE } from '@nestjs/core';

@Module({
  controllers: [AppController],
  imports: [
    ConfigModule.forRoot({
      envFilePath: [
        `env/.${process.env.NODE_ENV || 'development'}.env`,
        'env/.default.env',
      ],
      load: getConfiguration(),
      isGlobal: true,
      cache: true,
    }),
  ],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
      }),
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    // add middleware
    consumer.apply().forRoutes('*');
  }
}
