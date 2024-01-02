type ArrayOnly<T> = T extends any[] ? T : never;

type StringsOrNumbersArray = ArrayOnly<number | string | string[] | number[]>;

//never | never | string[] | number[] -> string[] | number[]
