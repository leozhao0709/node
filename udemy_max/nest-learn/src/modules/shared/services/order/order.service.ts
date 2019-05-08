import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from '../../../mongo-db/schemas/order.schema';
import { UserService } from '../user/user.service';
import { User } from '../../../mongo-db/schemas/user.schema';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel('Order') private readonly orderModel: Model<Order>,
    @InjectModel('User') private readonly userModel: Model<User>,
    private readonly userService: UserService,
  ) {}

  async getOrders() {
    return await this.orderModel
      .find({
        'user.userId': this.userService.getCurrentUser().id,
      })
      .exec();
  }

  async createOrderFromCart() {
    const orderProducts = (await this.userModel
      .findById(this.userService.getCurrentUser().id)
      .populate('cart.productId')).cart.map(item => {
      return { quantity: item.quantity, product: item.productId };
    });
    await this.orderModel.create({
      user: {
        email: this.userService.getCurrentUser().email,
        userId: this.userService.getCurrentUser().id,
      },
      products: orderProducts,
    });

    this.userService.getCurrentUser().cart = [];
    await this.userService.getCurrentUser().save();
  }
}
