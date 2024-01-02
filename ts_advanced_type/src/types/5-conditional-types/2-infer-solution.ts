interface CustomInterface<E, C, P> {
  retrieveE: () => E;
  fetchC: () => C;
  acquireP: () => P;
}
type NewType = CustomInterface<"E value", "C value", "P value">;

type Values<T> = T extends CustomInterface<unknown, unknown, infer P>
  ? P
  : never;

type test = Values<NewType>;
