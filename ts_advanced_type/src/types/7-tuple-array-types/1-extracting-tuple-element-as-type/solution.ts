export type First<T extends any[]> = T[0];

type test1 = First<[]>; // undefined

type test2 = First<[string]>; // string

type test3 = First<[2, 3, 4]>; // 2

type test4 = First<['a', 'b', 'c']>; // 'a'
