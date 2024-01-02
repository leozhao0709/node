export type GetNameValue<T> = any;

type Test = GetNameValue<{ name: "blabla" }>; // "blabla"
type Test2 = GetNameValue<{ name: { key: 123 } }>; // {key: 123}
