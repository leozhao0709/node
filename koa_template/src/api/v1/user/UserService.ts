import { logger1, logger2 } from '@app/enhancement/logger';
import { asyncWrap } from '@app/utils/wrap';

export const sleep = (millisecond) => {
  return new Promise<void>((res, rej) => {
    setTimeout(() => {
      res();
    }, millisecond);
  });
};

const UserService = {
  getAll: asyncWrap(logger1(true), logger2(true), async () => {
    sleep(3000);
    return 'all users';
  }),
};

export default UserService;
