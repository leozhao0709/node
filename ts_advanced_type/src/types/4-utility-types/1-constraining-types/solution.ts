type AddUnderline<T extends string> = `${T}_`;

type Test1 = AddUnderline<"test">;
type Test2 = AddUnderline<"">;

type Test3 = AddUnderline<23>;
type Test4 = AddUnderline<false>;
