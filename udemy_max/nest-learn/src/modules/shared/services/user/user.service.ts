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
import * as uuid from 'uuid/v4';
import { UserResetPasswordTokenExpireException } from '../../../../exceptions/user/userResetPasswordTokenExpireException';
import { UserUpdatePasswordDto } from '../../../../dto/user/user-update-password.dto';
@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async findUserById(id: string) {
    return await this.userModel.findById(id).exec();
  }

  async createUser(user: UserCreateDto) {
    const { email, password } = user;
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

  async resetPassword(email: string) {
    const token = uuid();
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new UserNotFoundException();
    }

    user.resetPasswordToken = token;
    user.resetPasswordTokenExpire = new Date(Date.now() + 1000 * 60 * 60);
    await user.save();
    return token;
  }

  async findUserByResetPasswordToken(token: string) {
    const user = await this.userModel.findOne({ resetPasswordToken: token });
    if (user) {
      if (user.resetPasswordTokenExpire.getTime() < Date.now()) {
        throw new UserResetPasswordTokenExpireException();
      }
      return user;
    }
    throw new UserNotFoundException();
  }

  async updatePassword(updatePasswordDto: UserUpdatePasswordDto) {
    const user = await this.userModel.findOne({
      resetPasswordToken: updatePasswordDto.token,
      _id: updatePasswordDto.userId,
    });
    if (!user) {
      throw new UserNotFoundException();
    }

    if (user.resetPasswordTokenExpire.getTime() < Date.now()) {
      throw new UserResetPasswordTokenExpireException();
    }

    user.password = await bcrypt.hash(updatePasswordDto.password, 12);
    user.resetPasswordToken = undefined;
    user.resetPasswordTokenExpire = undefined;
    await user.save();
  }
}
