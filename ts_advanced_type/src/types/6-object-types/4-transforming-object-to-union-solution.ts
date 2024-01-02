export interface User {
  id: string;
  username: string;
  age: number;
}

type TupleUnionOfUser = {
  [K in keyof User]: [K, User[K]];
}[keyof User];
