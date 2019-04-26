import { Module } from '@nestjs/common';
import { ShopController } from './shop.controller';
import { SharedModule } from '../shared/shared.module';

@Module({
  // imports: [SharedModule],
  controllers: [ShopController],
})
export class ShopModule {}
