const pick = <T extends object, U extends keyof T>(obj: T, arr: U[]) => {
  const newObj = {} as Record<keyof typeof obj, any>;
  for (const key of arr) {
    newObj[key] = obj[key];
  }

  return newObj;
};

export default pick;
