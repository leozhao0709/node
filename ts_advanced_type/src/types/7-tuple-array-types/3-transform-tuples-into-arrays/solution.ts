export type TupleToArray<T extends any[]> = T[number][];

type test1 = TupleToArray<[1, 2, 3]>; // (1 | 2 | 3)[]
type test2 = TupleToArray<[number, string]>; // (number | string)[]
type test3 = TupleToArray<[]>; // never[]

type test4 = TupleToArray<[1] | [2] | [3]>; // (1 | 2 | 3 ) []
