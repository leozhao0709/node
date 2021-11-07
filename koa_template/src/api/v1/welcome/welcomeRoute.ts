import Router from '@koa/router';

const welcomeRouter = new Router({
  prefix: '/api/v1/welcome',
});

welcomeRouter.get('/', (ctx) => {
  ctx.body = 'welcome!';
});

export default welcomeRouter;
