import Koa from 'koa';
import next from 'next';
import Router from '@koa/router';
import { parse } from 'url';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = new Koa();
  const router = new Router();

  router.get('/a/:id', async (ctx) => {
    const id = ctx.params.id;
    const parsedUrl = parse(`/a`, true);
    await handle(ctx.req, ctx.res, {
      ...parsedUrl,
      query: { id },
    });
  });

  server.use(router.routes());

  // handle nest url
  server.use(async (ctx, next) => {
    await handle(ctx.req, ctx.res); // must use node original request and response
    await next();
  });

  server.listen(3000, () => {
    console.log('koa server start at http://localhost:3000');
  });
});
