import { Injectable } from '@nestjs/common';
import { User } from '../../../mongo-db/schemas/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from '../../dto/user/create-user.dto';

@Injectable()
export class UserService {
  user: User;

  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async findUserById(id: string) {
    return await this.userModel.findById(id).exec();
  }

  async createUser(user: CreateUserDto) {
    return await this.userModel.create(user);
  }

  async addProductToCart();
}
