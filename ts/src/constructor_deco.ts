const constructorDecorator = () => {
  return <T extends new (...args: any[]) => any>(constructor: T) => {
    return class extends constructor {
      name = 'lee';
      getName() {
        return this.name;
      }
    };
  };
};

const Person = constructorDecorator()(
  class {
    name: string;
    constructor(name: string) {
      this.name = name;
    }
  }
);

const person = new Person('dell');
console.log(person.getName());

export {};
