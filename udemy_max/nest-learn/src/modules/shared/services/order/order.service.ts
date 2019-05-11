import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from '../../../mongo-db/schemas/order.schema';
import { User } from '../../../mongo-db/schemas/user.schema';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel('Order') private readonly orderModel: Model<Order>,
    @InjectModel('User') private readonly userModel: Model<User>,
  ) {}

  async getOrders(user: User) {
    return await this.orderModel
      .find({
        'user.userId': user.id,
      })
      .exec();
  }

  async createOrderFromCart(user: User) {
    const orderProducts = (await this.userModel
      .findById(user.id)
      .populate('cart.productId')).cart.map(item => {
      return { quantity: item.quantity, product: item.productId };
    });
    await this.orderModel.create({
      user: {
        email: user.email,
        userId: user.id,
      },
      products: orderProducts,
    });

    user.cart = [];
    await user.save();
  }
}
