export const numbers = [1, undefined, 25, 55, undefined];

const onlyNumbers = numbers.filter((number): number is number =>
  Boolean(number)
);
// number[]
