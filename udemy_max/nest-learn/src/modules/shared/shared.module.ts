import { Module, Global } from '@nestjs/common';
import { ProductService } from './services/product/product.service';
import { MongooseModule } from '@nestjs/mongoose';
import { productSchema } from '../mongo-db/schemas/product.schema';
import { UserService } from './services/user/user.service';
import { userSchema } from '../mongo-db/schemas/user.schema';
import { orderSchema } from '../mongo-db/schemas/order.schema';
import { OrderService } from './services/order/order.service';
import { SendEmailService } from './services/email/send-email/send-email.service';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Product', schema: productSchema },
      { name: 'User', schema: userSchema },
      { name: 'Order', schema: orderSchema },
    ]),
  ],
  providers: [ProductService, UserService, OrderService, SendEmailService],
  controllers: [],
  exports: [ProductService, UserService, OrderService, SendEmailService],
})
export class SharedModule {}
