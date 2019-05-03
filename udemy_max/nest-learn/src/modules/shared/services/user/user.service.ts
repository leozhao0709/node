import { Injectable } from '@nestjs/common';
import { User } from '../../../mongo-db/schemas/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from '../../dto/user/create-user.dto';
import { Product } from '../../../mongo-db/schemas/product.schema';

@Injectable()
export class UserService {
  user: User;

  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}

  async findUserById(id: string) {
    return await this.userModel.findById(id).exec();
  }

  async createUser(user: CreateUserDto) {
    return await this.userModel.create(user);
  }

  getCurrentUser() {
    return this.user;
  }

  async getCart() {
    const cart = (await this.userModel
      .findById(this.user.id)
      .populate('cart.productId')
      .exec()).cart.map(item => {
      return { quantity: item.quantity, product: item.productId };
    });
    return cart;
  }

  async addProductToCartById(productId: string) {
    const existingProdutIndex = this.user.cart.findIndex(product => {
      return product.productId.toString() === productId;
    });
    if (existingProdutIndex === -1) {
      // not exist product
      this.user.cart.push({ productId, quantity: 1 });
    } else {
      this.user.cart[existingProdutIndex].quantity += 1;
    }
    await this.user.save();
  }

  async deleteProductFromCartById(productId: string) {
    this.user.cart = this.user.cart.filter(
      product => product.productId.toString() !== productId,
    );
    await this.user.save();
  }
}