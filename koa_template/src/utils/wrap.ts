import _ from 'lodash';

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
