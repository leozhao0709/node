type NextFunction<T> = () => Promise<T> | T;
type Middleware<T> = (next: NextFunction<T>) => Promise<T> | T;

const compose = <T>(
  middlewares: Middleware<T>[],
  func: (...args: any[]) => Promise<T> | T
): ((...args: any[]) => Promise<T> | T) => {
  return async (...newArgs: any[]): Promise<T> => {
    async function dispatch(i: number): Promise<T> {
      if (i === middlewares.length) {
        return await func(...newArgs);
      }

      const middleware = middlewares[i];
      return await middleware(async () => dispatch(i + 1));
    }

    return await dispatch(0);
  };
};

export default compose;
