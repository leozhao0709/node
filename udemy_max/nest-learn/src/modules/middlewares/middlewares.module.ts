import { Module, NestModule, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../database/entities/product.entity';
import { Cart } from '../database/entities/cart.entity';
import { CartItem } from '../database/entities/cartItem.entity';
import { User } from '../database/entities/user.entity';
import { UserMiddleware } from './user/user.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Cart, CartItem, User])],
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
