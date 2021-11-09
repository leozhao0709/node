import enhancement from 'js-enhancement';

export const logger1: enhancement.AsyncEnhanceWrapper = (enable?: boolean) => {
  return async function (fn, ...args) {
    if (!enable) {
      const res = await fn(...args);
      return res;
    }
    console.log('logger1 before');
    const res = await fn(...args);
    console.log('logger1 after', res);
    return res;
  };
};

export const logger2 = (enable?: boolean) => {
  return async function (fn, ...args) {
    if (!enable) {
      const res = await fn(...args);
      return res;
    }
    console.log('logger2 before');
    const res = await fn(...args);
    console.log('logger2 after');
    return res;
  };
};
