const pick = <T, U extends keyof T>(obj: T, arr: U[]) => {
  const newObj = {} as Pick<T, U>;
  for (const key of arr) {
    newObj[key] = obj[key];
  }

  return newObj;
};

export default pick;
