import { Injectable } from '@nestjs/common';
import { User } from '../../../database/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from '../../../database/entities/order.entity';
import { Repository } from 'typeorm';
import { OrderItem } from '../../../database/entities/orderItem.entity';
import { CartItem } from '../../../database/entities/cartItem.entity';

@Injectable()
export class OrderService {
  user: User;

  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,
    @InjectRepository(CartItem)
    private readonly cartItemRepository: Repository<CartItem>,
  ) {}

  async createOrderFromCart() {
    const order = this.orderRepository.create();
    order.user = this.user;
    order.orderItems = this.user.cart.cartItems.map(cartItem => {
      const orderItem = this.orderItemRepository.create(cartItem);
      return orderItem;
    });
    await this.orderRepository.save(order);
    await this.cartItemRepository.remove(this.user.cart.cartItems);
    this.user.cart.cartItems = null;
    this.user.orders.push(order);
  }
}
