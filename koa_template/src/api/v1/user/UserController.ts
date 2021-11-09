import { RouterContext } from '@koa/router';
import UserService from './UserService';
import * as enhancement from 'js-enhancement';

const UserController = {
  getAll: enhancement.asyncWrap(
    async (ctx: RouterContext) => {
      ctx.body = await UserService.getAll();
    }
    // logger2(true),
    // logger1(true)
  ),
  getOne: (ctx: RouterContext) => {
    ctx.body = ctx.params.id;
  },
};

export default UserController;
