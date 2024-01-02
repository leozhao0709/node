export const dataObj = {
  key1: "a",
  key2: "b",
} as const;

type DataKeys = keyof typeof dataObj;

function getValue<T extends DataKeys>(key: T = "key1") {
  return dataObj[key];
}

const a = getValue("key1");
const b = getValue("key2");
const defaultValue = getValue(); //a
