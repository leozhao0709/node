import { Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SharedModule } from './modules/shared/shared.module';
import { ShopModule } from './modules/shop/shop.module';
import { AdminModule } from './modules/admin/admin.module';
import { MiddlewaresModule } from './modules/middlewares/middlewares.module';
import { MongoDbModule } from './modules/mongo-db/mongo-db.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserMiddleware } from './modules/middlewares/user/user.middleware';
import { CsrfMiddleware } from './modules/middlewares/csrf/csrf.middleware';

@Module({
  imports: [
    SharedModule,
    ShopModule,
    AdminModule,
    MiddlewaresModule,
    MongoDbModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(
    consumer: import('@nestjs/common').MiddlewareConsumer,
  ): void | import('@nestjs/common').MiddlewareConsumer {
    consumer
      .apply(UserMiddleware, CsrfMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
