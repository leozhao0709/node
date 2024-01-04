export type LengthPlusTwo<T extends any[]> = [...T, T, T]['length'];

type test1 = LengthPlusTwo<[]>; // 2

type test2 = LengthPlusTwo<[any]>; // 3

type test1 = LengthPlusTwo<[any, any]>; // 4

type test1 = LengthPlusTwo<[any, any, any]>; // 5
