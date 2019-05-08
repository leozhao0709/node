import { Injectable } from '@nestjs/common';
import { User } from '../../../mongo-db/schemas/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UserCreateDto } from '../../../../dto/user/user-create.dto';
import { UserAlreadyExistingException } from '../../../../exceptions/user/userAlreadyExistingException';
import * as bcrypt from 'bcryptjs';
import { UserLoginDto } from '../../../../dto/user/user-login.dto';
import { UserNotFoundException } from '../../../../exceptions/user/userNotFoundException';
import { UserInvalidPasswordException } from '../../../../exceptions/user/userInvalidPasswordException';
@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async findUserById(id: string) {
    return await this.userModel.findById(id).exec();
  }

  async createUser(user: UserCreateDto) {
    const { email, password, confirmPassword } = user;
    const existingUser = await this.userModel.findOne({ email }).exec();
    if (existingUser) {
      throw new UserAlreadyExistingException();
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const createdUser = await this.userModel.create({
      ...user,
      password: hashedPassword,
    });

    return createdUser.id;
  }

  async loginUser(userLoginDto: UserLoginDto): Promise<string> {
    const { email, password } = userLoginDto;

    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new UserNotFoundException();
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new UserInvalidPasswordException();
    }

    return user.id;
  }

  async getCart(user: User) {
    const cart = (await user
      .populate('cart.productId')
      .execPopulate()).cart.map(item => {
      return { quantity: item.quantity, product: item.productId };
    });
    return cart;
  }

  async addProductToCartById(user: User, productId: string) {
    const existingProdutIndex = user.cart.findIndex(product => {
      return product.productId.toString() === productId;
    });
    if (existingProdutIndex === -1) {
      // not exist product
      user.cart.push({ productId, quantity: 1 });
    } else {
      user.cart[existingProdutIndex].quantity += 1;
    }

    await user.save();
  }

  async deleteProductFromCartByProductId(user: User, productId: string) {
    user.cart = user.cart.filter(
      product => product.productId.toString() !== productId,
    );
    await user.save();
  }
}
