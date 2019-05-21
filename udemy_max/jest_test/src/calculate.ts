export const add = (...args) => args.reduce((prev, cur) => prev + cur, 0);

export const asyncAdd = (second: number, ...args) => {
  return new Promise<number>((res, rej) => {
    setTimeout(() => {
      res(add(...args));
    }, second * 1000);
  });
};
