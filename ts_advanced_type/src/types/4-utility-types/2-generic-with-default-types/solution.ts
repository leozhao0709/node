type BuildObject<T, E = null> = {
  prop1: T;
  prop2: E;
};

type Test = BuildObject<string>;

type Test_2 = BuildObject<string>;
