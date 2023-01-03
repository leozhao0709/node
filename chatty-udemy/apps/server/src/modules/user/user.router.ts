import Router from '@koa/router';
import { KoaState } from 'koa';
import {
  createUserReqSchema,
  CreateUserRequest,
} from './schemas/userReqSchema.js';
import validateReqBody from '@app/middlewares/validateReqBody.js';
import UserBO from './UserBO.js';

const userRouter = new Router({ prefix: '/api/v1/user' });
const routerName = 'user';

userRouter.post<KoaState<CreateUserRequest>>(
  routerName,
  '/',
  validateReqBody(createUserReqSchema),
  (ctx) => {
    const userBo = new UserBO(ctx.state.reqBody);
    ctx.body = userBo;
  }
);

userRouter.get(routerName, '/:id', (ctx) => {});

export default userRouter;
