export const dataObj = {
  key1: "a",
  key2: "b",
} as const;

type DataKey = keyof typeof dataObj;

function getValue(): (typeof dataObj)["key1"];
function getValue<T extends DataKey>(key: T): (typeof dataObj)[T];
function getValue(key: DataKey = "key1") {
  return dataObj[key];
}

const a = getValue("key1");
const b = getValue("key2");
const defaultValue = getValue();
