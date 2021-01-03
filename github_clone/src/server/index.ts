import Koa from 'koa';
import next from 'next';
import Router from '@koa/router';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = new Koa();

  server.use(async (ctx, next) => {
    ctx.body = { success: true };
  });

  server.use(async (ctx, next) => {
    await handle(ctx.req, ctx.res); // must use node original request and response
    await next();
  });

  server.listen(3000, () => {
    console.log('koa server start at http://localhost:3000');
  });
});
