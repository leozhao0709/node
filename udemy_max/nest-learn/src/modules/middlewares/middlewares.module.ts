import { Module, NestModule, RequestMethod } from '@nestjs/common';
import { UserMiddleware } from './user/user.middleware';

@Module({
  imports: [],
})
export class MiddlewaresModule implements NestModule {
  configure(
    consumer: import('@nestjs/common').MiddlewareConsumer,
  ): void | import('@nestjs/common').MiddlewareConsumer {
    consumer
      .apply(UserMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
