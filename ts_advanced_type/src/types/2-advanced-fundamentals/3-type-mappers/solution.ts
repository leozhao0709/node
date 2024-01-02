export interface User {
  id: string;
  age: number;
  title?: string;
}

/*
  YOUR JOB:
  1. Build a type based on User Interface, with immutable properties.
  2. In this new type, make all the optional properties to be mendatory. (Remove the ?)
*/

type UserWithNoOptionals = {
  readonly [K in keyof User]-?: User[K];
};

const user: User = {
  id: 'id',
  age: 23,
  title: 'test',
};

const user2: UserWithNoOptionals = {
  id: 'id',
  age: 23,
  title: 'test',
};
