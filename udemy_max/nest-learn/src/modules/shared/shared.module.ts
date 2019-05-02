import { Module, Global } from '@nestjs/common';
import { ProductService } from './services/product/product.service';
import { CartService } from './services/cart/cart.service';
import { OrderService } from './services/order/order.service';
import { MongooseModule } from '@nestjs/mongoose';
import { productSchema } from '../mongo-db/schemas/product.schema';
import { UserService } from './services/user/user.service';
import { userSchema } from '../mongo-db/schemas/user.schema';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Product', schema: productSchema },
      { name: 'User', schema: userSchema },
    ]),
  ],
  providers: [ProductService, CartService, OrderService, UserService],
  controllers: [],
  exports: [ProductService, CartService, OrderService],
})
export class SharedModule {}
