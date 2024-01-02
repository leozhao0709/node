//Fix this error.
type AddUnderline<T> = `${T}_`;

type Test1 = AddUnderline<"test">;
type Test2 = AddUnderline<"">;

//Should error.
type Test3 = AddUnderline<23>;
type Test4 = AddUnderline<false>;

export {};
