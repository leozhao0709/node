import Router from '@koa/router';
import UserController from './UserController';

const UserRouter = new Router({
  prefix: '/api/v1/user',
});

UserRouter.get('/all', UserController.getAll);

export default UserRouter;
