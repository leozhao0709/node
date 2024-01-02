export interface Obj {
  first_name: string;
  last_name: string;
  school_Name: string;
  age: number;
  email: string;
}

type KeysWithName<T> = unknown;

/*
{
    first_name: string;
    last_name: string;
    school_Name: string;
}
*/
