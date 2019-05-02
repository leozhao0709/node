import { Injectable } from '@nestjs/common';

@Injectable()
export class OrderService {
  user: User;

  constructor() {}

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
