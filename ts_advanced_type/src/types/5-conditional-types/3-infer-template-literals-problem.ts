export type MiddleWords<T> = any;

type test = MiddleWords<"Time flies fast">; // "flies"
type test2 = MiddleWords<"Life constantly changes">; // "constantly"
type test3 = MiddleWords<"Dreams never die">; // "never"
type test4 = MiddleWords<"Nature remains beautiful">; // "remains"
