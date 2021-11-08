import { RouterContext } from '@koa/router';
import UserService from './UserService';
import { logger1, logger2 } from '../../../enhancement/logger';
import wrap from '../../../utils/wrap';

export const sleep = (millisecond) => {
  return new Promise<void>((res, rej) => {
    setTimeout(() => {
      res();
    }, millisecond);
  });
};

// class UserController {
//   constructor(private userService: typeof UserService) {}

//   @logger1(true)
//   @logger2(true)
//   async getAll(ctx: RouterContext) {
//     await sleep(3000);
//     ctx.body = await this.userService.getAll();
//   }

//   async getOne(ctx: RouterContext) {
//     ctx.body = ctx.params.id;
//   }
// }

// export default new UserController(UserService);

const UserController = {
  getAll: wrap(
    async (ctx: RouterContext) => {
      await sleep(3000);
      ctx.body = UserService.getAll();
    },
    logger2(true),
    logger1(true)
  ),
  getOne: (ctx: RouterContext) => {
    ctx.body = ctx.params.id;
  },
};

export default UserController;
