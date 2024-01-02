type BuildObject<T, E> = {
  prop1: T;
  prop2: E;
};

type Test = BuildObject<string, number>;

//Fix this error.
type Test2 = BuildObject<string>; //{prop1: string, prop2: null}

export {};
