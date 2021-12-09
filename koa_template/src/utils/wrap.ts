import _ from 'lodash';

// export type AsyncEnhanceWrapper = <
//   T extends (...args: any[]) => Promise<any | undefined>
// >(
//   ...args
// ) => AsyncEnhanceWrapFunc<T>;

// export type AsyncEnhanceWrapFunc<
//   T extends (...args: any[]) => Promise<any | undefined>
// > = (
//   fn: (...args: any[]) => Promise<T | undefined>,
//   ...args: Parameters<typeof fn>
// ) => Promise<T | undefined>;

// export const asyncWrap = <
//   T extends (...args: any[]) => Promise<any | undefined>
// >(
//   ...fns: [...AsyncEnhanceWrapFunc<T>[], T]
// ): T => {
//   const fnReverse = fns.reverse();
//   if (fns.length <= 1) {
//     throw 'At least needs 2 functions';
//   }
//   const coreFn = fnReverse[0] as T;
//   const wraps = fnReverse.slice(1) as AsyncEnhanceWrapFunc<T>[];
//   return wraps.reduce((res, wrap) => {
//     res = _.wrap(res, wrap) as T;
//     return res;
//   }, coreFn);
// };

type WrapFunc = (...args: unknown[]) => Promise<unknown> | undefined;

export type AsyncEnhanceWrapper = (...args) => AsyncEnhanceWrapFunc;

type AsyncEnhanceWrapFunc = (
  fn: WrapFunc,
  ...args: Parameters<typeof fn>
) => Promise<unknown> | undefined;

export const asyncWrap = <T extends WrapFunc>(
  ...fns: [...AsyncEnhanceWrapFunc[], T]
): T => {
  if (fns.length === 0) {
    throw Error('fns need at least 1 function');
  }

  if (fns.length === 1) {
    return fns[0] as T;
  }

  const coreFn = fns[fns.length - 1] as T;
  const nextCoreFn = ((...args) => fns[fns.length - 2](coreFn, ...args)) as T;
  const wrapFuncList = fns.filter(
    (fn, index) => index !== fns.length - 1 && index !== fns.length - 2
  );
  return asyncWrap(...wrapFuncList, nextCoreFn);
};
