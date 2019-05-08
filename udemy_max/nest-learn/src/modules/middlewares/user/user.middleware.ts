import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { UserService } from '../../shared/services/user/user.service';

@Injectable()
export class UserMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) {}

  async use(req: Request, res: Response, next: () => void) {
    if (req.session.isLoggedIn) {
      req.user = await this.userService.findUserById(req.session.userId);
    }
    next();
  }
}
