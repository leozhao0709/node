import Koa from 'koa';
import cors from '@koa/cors';
import onerror from 'koa-onerror';
import koaLogger from 'koa-logger';
import { koaBody, HttpMethodEnum } from 'koa-body';
import koaStatic from 'koa-static';
import stripAnsi from 'strip-ansi';
import koaHelmet from './middlewares/koaHelmet.js';
import logger from './utils/logger.js';
import routers from './routers.js';
import { IncomingMessage, ServerResponse } from 'http';
import { Http2ServerRequest, Http2ServerResponse } from 'http2';
import Exception from './exception/Exception.js';
import koaI18n from './middlewares/koaI18n.js';
import config from './config/index.js';

export default class App {
  private readonly app: Koa;
  private globalMiddlwares: Koa.Middleware[];

  constructor() {
    this.app = new Koa();
    this.setupGlobalErrorHandler();
    this.globalMiddlwares = this.defaultGlobalMiddlewares();
  }

  addGlobalMiddlewares(...middlewares: Koa.Middleware[]) {
    this.globalMiddlwares = [...this.globalMiddlwares, ...middlewares];
  }

  addGlobalMiddleware(middleware: Koa.Middleware) {
    this.globalMiddlwares.push(middleware);
  }

  setupGlobalErrorHandler(jsonErrorHandler = this.defaultJsonErrorHandler) {
    onerror(this.app, {
      accepts: () => 'json',
      json: jsonErrorHandler,
    });
  }

  listen(port: number, callback: () => void) {
    this.applyGlobalMiddlewares();
    this.app.listen(port, callback);
  }

  /**
   *
   * @returns native http handler
   */
  callback(): (
    req: IncomingMessage | Http2ServerRequest,
    res: Http2ServerResponse | ServerResponse<IncomingMessage>
  ) => void {
    this.applyGlobalMiddlewares();
    return this.app.callback();
  }

  private applyGlobalMiddlewares() {
    for (const middleware of this.globalMiddlwares) {
      this.app.use(middleware);
    }
    this.applyRouterMiddlewares();
  }

  private applyRouterMiddlewares(): void {
    for (const router of routers) {
      this.app.use(router.routes()).use(router.allowedMethods());
    }
  }

  private defaultGlobalMiddlewares(): Koa.Middleware[] {
    const defaultMiddlewares = [
      koaI18n(),
      koaHelmet(),
      cors(),
      koaBody({
        parsedMethods: [
          HttpMethodEnum.GET, // by default, koa-body won't support Get Body
          HttpMethodEnum.POST,
          HttpMethodEnum.PUT,
          HttpMethodEnum.PATCH,
        ],
        jsonLimit: config.KOA_BODY.JSON_LIMIT,
        formLimit: config.KOA_BODY.FORM_LIMIT,
      }),
      koaLogger((str) => {
        logger.info(stripAnsi(str.trim()));
      }),
      koaStatic(config.STATIC_PATH),
    ];

    return defaultMiddlewares;
  }

  private defaultJsonErrorHandler(err: unknown, ctx: Koa.Context) {
    if (err instanceof Exception) {
      ctx.status = err.httpStatusCode;
      ctx.body = { code: err.errorCode, err: err.message };
      return;
    }

    if (err instanceof Error) {
      ctx.body = { code: -1, err: err.message };
      return;
    }
  }
}
