import { Module, Global } from '@nestjs/common';
import { ShopService } from './services/shop/shop.service';
import { CartService } from './services/cart/cart.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../database/entities/product.entity';
import { Cart } from '../database/entities/cart.entity';
import { CartItem } from '../database/entities/cartItem.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Product, Cart, CartItem])],
  providers: [ShopService, CartService],
  controllers: [],
  exports: [ShopService, CartService],
})
export class SharedModule {}
