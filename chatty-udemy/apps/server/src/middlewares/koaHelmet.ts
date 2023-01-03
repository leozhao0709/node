import { IncomingMessage, ServerResponse } from 'http';
import helmet, { HelmetOptions } from 'helmet';
import Koa from 'koa';

const helmetPromise = (
  request: IncomingMessage,
  response: ServerResponse<IncomingMessage>,
  options?: Readonly<HelmetOptions>
) => {
  return new Promise<void>((res, rej) => {
    helmet(options)(request, response, async (err) => {
      if (err !== undefined) {
        rej(err);
      }
      res();
    });
  });
};

const koaHelmet = (options?: Readonly<HelmetOptions>): Koa.Middleware => {
  return async (ctx, next) => {
    try {
      await helmetPromise(ctx.req, ctx.res, options);
      await next();
    } catch (error) {
      ctx.throw(500, error as Error);
    }
  };
};

export default koaHelmet;
