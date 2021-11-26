import _ from 'lodash';

export type AsyncEnhanceWrapper = <T extends (...args: any[]) => Promise<any>>(
  ...args
) => AsyncEnhanceWrapFunc<T>;

export type AsyncEnhanceWrapFunc<T extends (...args: any[]) => Promise<any>> = (
  fn: (...args: any[]) => Promise<T>,
  ...args: Parameters<typeof fn>
) => Promise<T>;

export const asyncWrap = <T extends (...args: any[]) => Promise<any>>(
  ...fns: [...AsyncEnhanceWrapFunc<T>[], T]
): T => {
  const fnReverse = fns.reverse();
  if (fns.length <= 1) {
    throw 'At least needs 2 functions';
  }
  const coreFn = fnReverse[0] as T;
  const wraps = fnReverse.slice(1) as AsyncEnhanceWrapFunc<T>[];
  return wraps.reduce((res, wrap) => {
    res = _.wrap(res, wrap) as T;
    return res;
  }, coreFn);
};
