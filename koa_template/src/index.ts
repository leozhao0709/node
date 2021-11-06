import Koa from 'koa';
import onerror from 'koa-onerror';
import logger from 'koa-logger';
import koaBody from 'koa-body';
import fs from 'fs';

const app = new Koa();

onerror(app, {
  accepts: () => 'json',
  json: (err, ctx) => {
    ctx.body = ctx.body = { code: -1, data: [], msg: err.message };
  },
});
app.use(koaBody());
app.use(logger());

app.use(async (ctx) => {
  ctx.body = fs.createReadStream('not exist');
});

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx);
});

app.listen(5000, () => {
  console.log(`app start at 5000`);
});
