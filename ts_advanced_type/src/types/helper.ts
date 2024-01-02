/* eslint-disable @typescript-eslint/no-namespace */

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'test' | 'development' | 'production';
    }
  }
}

export type Constructor<T extends new (...args: any) => any> = new (
  ...args: any[]
) => InstanceType<T>;
