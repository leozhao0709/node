import * as Koa from 'koa';

declare module 'koa' {
  interface KoaState<T> extends Koa.DefaultState {
    reqBody: T;
  }
}

export type KoaContext<T> = Koa.ParameterizedContext<Koa.KoaState<T>>;
