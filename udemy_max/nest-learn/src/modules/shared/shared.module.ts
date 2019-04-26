import { Module, Global } from '@nestjs/common';
import { ShopService } from './services/shop/shop.service';
import { CartService } from './services/cart/cart.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../database/entities/product.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  providers: [ShopService, CartService],
  controllers: [],
  exports: [ShopService, CartService],
})
export class SharedModule {}
