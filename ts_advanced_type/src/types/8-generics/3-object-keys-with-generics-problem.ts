export function getObjKeys(object: unknown) {
  return Object.keys(object);
}

const test = getObjKeys({
  key1: "value 1",
  kay2: 123,
});

// ("key1" | "kay2")[]
