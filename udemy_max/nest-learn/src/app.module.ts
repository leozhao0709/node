import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SharedModule } from './modules/shared/shared.module';
import { ShopModule } from './modules/shop/shop.module';
import { AdminModule } from './modules/admin/admin.module';
import { DatabaseModule } from './modules/database/database.module';
import { MiddlewaresModule } from './modules/middlewares/middlewares.module';

@Module({
  imports: [
    SharedModule,
    ShopModule,
    AdminModule,
    DatabaseModule,
    MiddlewaresModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
