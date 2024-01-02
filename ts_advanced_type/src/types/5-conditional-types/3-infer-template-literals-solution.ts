export type MiddleWords<T> =
  T extends `${infer First} ${infer Middle} ${infer Last}` ? Middle : never;

type test = MiddleWords<"Time flies fast">;
type test2 = MiddleWords<"Life constantly changes">;
type test3 = MiddleWords<"Dreams never die">;
type test4 = MiddleWords<"Nature remains beautiful">;
