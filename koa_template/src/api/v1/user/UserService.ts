import { logger1, logger2 } from '@app/enhancement/logger';
import { asyncWrap, AsyncEnhanceWrapper } from '@app/utils/wrap';

export const sleep = (millisecond) => {
  return new Promise<void>((res, rej) => {
    setTimeout(() => {
      res();
    }, millisecond);
  });
};

const errorCatchWrap: AsyncEnhanceWrapper = () => {
  return async function (fn, ...args) {
    try {
      console.log('...errorCatchWrap...before..');
      const result = await fn(...args);
      console.log('...errorCatchWrap...after..');
      return result;
    } catch (error) {
      console.log('...catched error...', error);
    }
  };
};

const UserService = {
  getAll: asyncWrap(
    errorCatchWrap(),
    logger1(true),
    logger2(true),
    async () => {
      await sleep(3000);
      console.log('....getAll...');
      return 'all users';
    }
  ),
};

export default UserService;
