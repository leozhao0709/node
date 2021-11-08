import _ from 'lodash';
import wrap from '../../../utils/wrap';
import { sleep } from '../user/UserController';

const logger1 = () => {
  return async function (fn, ...args) {
    console.log('logger1 before');
    const res = await fn(...args);
    console.log('logger1 after');
    return res;
  };
};

const logger2 = () => {
  return async function (fn, ...args) {
    const res = await fn(...args);
    return res + ' logger2';
  };
};

const get = wrap(
  async function (text1: string, text2: number) {
    console.log('within func');
    await sleep(3000);
    return text1 + text2;
  },
  logger2(),
  logger1()
);
