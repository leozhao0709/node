export interface Obj {
  first_name: string;
  last_name: string;
  school_Name: string;
  age: number;
  email: string;
}

type KeysEndingWithName<T> = {
  [K in keyof T as K extends `${string}${"name" | "Name"}` ? K : never]: T[K];
};

type test = KeysEndingWithName<Obj>;
