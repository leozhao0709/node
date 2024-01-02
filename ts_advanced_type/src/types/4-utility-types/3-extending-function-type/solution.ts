//Fix this error.
type FunctionTypes<T extends (...args: any) => any> = {
  receives: Parameters<T>;
  returns: ReturnType<T>;
};

type Test0 = FunctionTypes<() => string>;
type Test1 = FunctionTypes<() => number>;
type Test2 = FunctionTypes<(str: string) => boolean>;
type Test3 = FunctionTypes<(a: number, b: number) => void>;

export {};
