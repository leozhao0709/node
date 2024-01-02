export const myFunc = <T, K extends keyof T>(object: T, key: K) => {
  return object[key];
};

const dataObj = {
  key1: true,
  key2: "some-string",
  key3: 132,
};

const test = myFunc(dataObj, "key1"); // boolean
const test2 = myFunc(dataObj, "key2"); // string
const test3 = myFunc(dataObj, "key3"); // number
