import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ShopController } from './controllers/shop/shop.controller';
import { ShopService } from './services/shop/shop.service';
import { CartService } from './services/cart/cart.service';
import { AdminController } from './controllers/admin/admin.controller';

@Module({
  imports: [],
  controllers: [AppController, ShopController, AdminController],
  providers: [AppService, ShopService, CartService],
})
export class AppModule {}
