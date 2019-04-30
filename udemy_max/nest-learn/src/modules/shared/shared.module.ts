import { Module, Global } from '@nestjs/common';
import { ProductService } from './services/product/product.service';
import { CartService } from './services/cart/cart.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../database/entities/product.entity';
import { Cart } from '../database/entities/cart.entity';
import { CartItem } from '../database/entities/cartItem.entity';
import { OrderService } from './services/order/order.service';
import { Order } from '../database/entities/order.entity';
import { OrderItem } from '../database/entities/orderItem.entity';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([Product, Cart, CartItem, Order, OrderItem]),
  ],
  providers: [ProductService, CartService, OrderService],
  controllers: [],
  exports: [ProductService, CartService, OrderService],
})
export class SharedModule {}
