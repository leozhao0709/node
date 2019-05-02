import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request } from 'express';
import { ProductService } from '../../shared/services/product/product.service';
import { CartService } from '../../shared/services/cart/cart.service';
import { OrderService } from '../../shared/services/order/order.service';
import { User } from '../../mongo-db/schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserService } from '../../shared/services/user/user.service';

@Injectable()
export class UserMiddleware implements NestMiddleware {
  private user: User;

  constructor(
    private readonly userService: UserService,
    private readonly cartService: CartService,
    private readonly orderService: OrderService,
    @InjectModel('User') private readonly userModel: Model<User>,
  ) {}

  async use(req: Request, res: any, next: () => void) {
    if (!this.user) {
      let user = await this.userService.findUserById('sd');
      if (!user) {
        user = await this.userService.createUser({
          name: 'Lei',
          email: 'lzhao@test.com',
          cart: [],
        });
      }
      this.user = user;
    }
    this.cartService.cart = this.user.cart;
    this.orderService.user = this.user;
    this.userService.user = this.user;
    req.user = this.user;
    next();
  }
}
