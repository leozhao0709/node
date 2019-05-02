import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SharedModule } from './modules/shared/shared.module';
import { ShopModule } from './modules/shop/shop.module';
import { AdminModule } from './modules/admin/admin.module';
import { MiddlewaresModule } from './modules/middlewares/middlewares.module';
import { MongoDbModule } from './modules/mongo-db/mongo-db.module';

@Module({
  imports: [SharedModule, ShopModule, AdminModule, MiddlewaresModule, MongoDbModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
