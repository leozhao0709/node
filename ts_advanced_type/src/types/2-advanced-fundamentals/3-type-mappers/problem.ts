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

type UserWithNoOptionals = any;
