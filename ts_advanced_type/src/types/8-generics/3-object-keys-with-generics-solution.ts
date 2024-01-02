export function getObjKeys<T extends {}>(object: T) {
  return Object.keys(object) as Array<keyof T>;
}

const test = getObjKeys({
  key1: "value 1",
  kay2: 123,
});
