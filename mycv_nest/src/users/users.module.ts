import { Module } from '@nestjs/common';
import { UsersController } from './users.controller.js';
import { UsersService } from './users.service.js';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { User } from './user.entity.js';

@Module({
  imports: [MikroOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
