import Koa, { KoaState } from 'koa';
import { formatZodError } from '../utils/zodUtils.js';

const validateReqBody = <T>(
  schema: Zod.Schema<T>
): Koa.Middleware<KoaState<T>> => {
  return async (ctx, next) => {
    const result = schema.safeParse(ctx.request.body);
    if (!result.success) {
      const errorMsg = formatZodError(result.error.errors);
      ctx.throw(400, errorMsg);
    } else {
      ctx.state.reqBody = result.data;
    }
    await next();
  };
};

export default validateReqBody;
