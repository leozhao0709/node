export const logger1 = async (next) => {
  console.log(next);
  console.log('logger1 before');
  await next;
  console.log('logger1 after');
};

export const logger2 = async (next) => {
  console.log('logger2 before');
  await next;
  console.log('logger2 after');
};
