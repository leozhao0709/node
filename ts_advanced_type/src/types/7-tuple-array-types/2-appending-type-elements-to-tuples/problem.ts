export type Append<T extends any[], E> = unknown;

type test1 = Append<[1, 2, 3, 4], 4>; // [1, 2, 3, 4]
type test2 = Append<[], 1>; // [1]
