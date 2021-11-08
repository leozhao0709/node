export const createMethodDecorator = (
  fn: (method: () => Promise<unknown>) => Promise<unknown>
) => {
  return (
    target: any,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor
  ) => {
    const method = descriptor.value as (...args) => unknown;
    descriptor.value = async function (...args) {
      await fn(async () => await method.apply(this, args));
    };
  };
};
