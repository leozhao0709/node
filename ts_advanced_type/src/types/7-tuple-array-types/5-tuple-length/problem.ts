export type Length<T extends any[]> = unknown;

type test1 = Length<[]>; // 0
type test2 = Length<[any]>; // 1
type test3 = Length<[any, any]>; // 2
type test4 = Length<[any, any, any]>; // 3
