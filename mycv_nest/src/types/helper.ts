/* eslint-disable @typescript-eslint/no-namespace */

export type Subset<K> = {
  [attr in keyof K]?: K[attr] extends object
    ? Subset<K[attr]>
    : K[attr] extends object | null
    ? Subset<K[attr]> | null
    : K[attr] extends object | null | undefined
    ? Subset<K[attr]> | null | undefined
    : K[attr];
};

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
