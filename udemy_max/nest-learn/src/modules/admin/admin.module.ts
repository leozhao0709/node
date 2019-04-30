import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { SharedModule } from '../shared/shared.module';

@Module({
  controllers: [AdminController],
})
export class AdminModule {}
