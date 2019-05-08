import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { UserService } from '../../shared/services/user/user.service';
import { User } from '../../mongo-db/schemas/user.schema';

@Injectable()
export class UserMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) {}

  async use(req: Request, res: Response, next: () => void) {
    if (req.session.isLoggedIn) {
      // this.userService.user = await this.userService.findUserById(
      //   req.session.user._id,
      // );
      this.userService.user = req.session.user;
      console.log('...middleware id...', req.session.user.id);
    }
    next();
  }
}
