function paramDecorator(target: any, propertyKey: string, paramIndex: number) {
  console.log(target, propertyKey, paramIndex);
}

class Person {
  getInfo(name: string, @paramDecorator age: number) {
    console.log(name, age);
  }
}

const person = new Person();
person.getInfo('dell', 30);
export {};
