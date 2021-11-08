import { method } from 'lodash';
import { createMethodDecorator } from '../utils/decorator';

// export const logger1 = (enable?) =>
//   createMethodDecorator(async (method) => {
//     if (!enable) {
//       await method();
//       return;
//     }
//     console.log('logger1 before');
//     await method();
//     console.log('logger1 after');
//   });

// export const logger2 = (enable?) =>
//   createMethodDecorator(async (method) => {
//     if (!enable) {
//       await method();
//       return;
//     }
//     console.log('logger2 before');
//     await method();
//     console.log('logger2 after');
//   });

export const logger1 = (enable?: boolean) => {
  return async function (fn, ...args) {
    if (!enable) {
      await fn(...args);
      return;
    }
    console.log('logger1 before');
    const res = await fn(...args);
    console.log('logger1 after');
    return res;
  };
};

export const logger2 = (enable?: boolean) => {
  return async function (fn, ...args) {
    if (!enable) {
      await fn(...args);
      return;
    }
    console.log('logger2 before');
    const res = await fn(...args);
    console.log('logger2 after');
    return res;
  };
};
