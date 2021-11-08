import _ from 'lodash';

const wrap = <T extends (...args: any[]) => unknown, TResult>(
  func: T,
  ...wraps: ((value: T, ...args: Parameters<T>) => TResult)[]
) => {
  return wraps.reduce((res, wrap) => {
    res = _.wrap(res, wrap as any) as T;
    return res;
  }, func);
};

export default wrap;
