import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request } from 'express';
import { User } from '../../database/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from '../../database/entities/cart.entity';
import { ProductService } from '../../shared/services/product/product.service';
import { CartService } from '../../shared/services/cart/cart.service';
import { OrderService } from '../../shared/services/order/order.service';

@Injectable()
export class UserMiddleware implements NestMiddleware {
  private user: User;

  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Cart) private readonly cartRepository: Repository<Cart>,
    private readonly shopService: ProductService,
    private readonly cartService: CartService,
    private readonly orderService: OrderService,
  ) {}

  async use(req: Request, res: any, next: () => void) {
    if (!this.user) {
      this.user = (await this.userRepository.findByIds([1], {
        relations: [
          'cart',
          'orders',
          'products',
          'cart.cartItems',
          'cart.cartItems.product',
          'orders.orderItems',
          'orders.orderItems.product',
        ],
      }))[0];
      if (!this.user.cart) {
        const cart = this.cartRepository.create();
        cart.cartItems = [];
        cart.user = this.user;
        await this.cartRepository.save(cart);

        this.user.cart = cart;
      }

      this.cartService.cart = this.user.cart;
      this.shopService.user = this.user;
      this.orderService.user = this.user;
    }

    req.user = this.user;
    next();
  }
}
