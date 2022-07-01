type Constructor<T extends new (...args: any) => any> = new (
  ...args: any[]
) => InstanceType<T>;

const constructorDec = () => {
  return <T extends Constructor<T>>(targetClass: T) => {
    const className = targetClass.name;
    console.log(className);
  };
};

@constructorDec()
export class CustomerService {
  name = '下单';
  constructor() {}

  buy() {
    console.log(`${this.name} buy`);
  }

  placeOrder() {
    console.log(`${this.name} place order`);
  }
}
