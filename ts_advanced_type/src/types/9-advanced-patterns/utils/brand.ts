export type Brand<T, BrandName extends string> = T & { __brand: BrandName };
