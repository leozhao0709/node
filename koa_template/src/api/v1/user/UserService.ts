import { logger1, logger2 } from '@app/enhancement/logger';
import {
  AsyncEnhanceWrapFunc,
  asyncWrap,
  AsyncEnhanceWrapper,
} from '@app/utils/wrap';
import enhancement from 'js-enhancement';

export const sleep = (millisecond) => {
  return new Promise<void>((res, rej) => {
    setTimeout(() => {
      res();
    }, millisecond);
  });
};

const wrap1: AsyncEnhanceWrapper = () => {
  return async function (fn, ...args) {
    console.log('...wrap1...before..');
    const result = await fn(...args);
    console.log('...wrap1...after..');
    return result;
  };
};

const UserService = {
  getAll: asyncWrap(logger1(true), wrap1(), async () => {
    await sleep(3000);
    console.log('....getAll...');
    return 'all users';
  }),
};

export default UserService;
