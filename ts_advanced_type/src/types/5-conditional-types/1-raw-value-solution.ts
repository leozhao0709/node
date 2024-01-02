type GetNameValue<T> = T extends { name: any } ? T["name"] : never;
type GetNameValueWithInfer<T> = T extends { name: infer E } ? E : never;

type Test = GetNameValue<{ name: "blabla" }>; // "blabla"
type Test2 = GetNameValue<{ name: { key: 123 } }>; // {key: 123}
