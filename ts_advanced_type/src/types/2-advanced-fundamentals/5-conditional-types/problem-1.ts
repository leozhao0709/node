export type ArrayOnly<T> = unknown;

type StringsOrNumbersArray = ArrayOnly<number | string | string[] | number[]>;
// string[] | number[]
