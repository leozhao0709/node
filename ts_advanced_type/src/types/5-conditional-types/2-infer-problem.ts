export interface CustomInterface<E, C, P> {
  retrieveE: () => E;
  fetchC: () => C;
  acquireP: () => P;
}
type NewType = CustomInterface<"E value", "C value", "P value">;

type Values<T> = any;

type test = Values<NewType>; // "P value"
