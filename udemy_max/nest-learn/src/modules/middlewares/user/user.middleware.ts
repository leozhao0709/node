import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request } from 'express';
import { User } from '../../mongo-db/schemas/user.schema';
import { UserService } from '../../shared/services/user/user.service';

@Injectable()
export class UserMiddleware implements NestMiddleware {
  private user: User;

  constructor(private readonly userService: UserService) {}

  async use(req: Request, res: any, next: () => void) {
    if (!this.user) {
      let user = await this.userService.findUserById(
        '5ccb76d11702a7a31a8022de',
      );
      if (!user) {
        user = await this.userService.createUser({
          name: 'Lei',
          email: 'lzhao@test.com',
          cart: [],
        });
      }
      this.user = user;
    }
    this.userService.user = this.user;
    next();
  }
}
