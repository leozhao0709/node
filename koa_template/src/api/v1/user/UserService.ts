import { logger1, logger2 } from '@app/enhancement/logger';
import { asyncWrap } from 'js-enhancement';

export const sleep = (millisecond) => {
  return new Promise<void>((res, rej) => {
    setTimeout(() => {
      res();
    }, millisecond);
  });
};

const UserService = {
  getAll: asyncWrap(
    async () => {
      await sleep(3000);
      return 'all users';
    },
    // logger2(true)
    logger1(true)
  ),
};

export default UserService;
