import { Context } from 'koa';
import UserService from './UserService';

const UserController = {
  // getAll: compose(logger1, logger2, async function (ctx: Context) {
  //   ctx.body = await UserService.getAll();
  // }),
  getAll: async function (ctx: Context) {
    ctx.body = await UserService.getAll();
  },
};

export default UserController;
