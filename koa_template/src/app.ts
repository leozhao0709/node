import Koa from 'koa';
import onerror from 'koa-onerror';
import logger from 'koa-logger';
import koaBody from 'koa-body';
import welcomeRouter from './api/v1/welcome/welcomeRoute';
import UserRouter from './api/v1/user/UserRoute';

const app = new Koa();

onerror(app, {
  accepts: () => 'json',
  json: (err, ctx) => {
    ctx.body = ctx.body = { code: -1, data: [], msg: err.message };
  },
});
app.use(koaBody());
app.use(logger());

app.use(welcomeRouter.routes());
app.use(welcomeRouter.allowedMethods());

app.use(UserRouter.routes());
app.use(UserRouter.allowedMethods());

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx);
});

export default app;
