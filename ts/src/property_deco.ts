function writable(value: boolean) {
  return function (target: any, propertyKey: string): any {
    const descriptor: PropertyDescriptor = {
      writable: value,
    };
    return descriptor;
  };
}

class Person {
  @writable(true)
  name = 'Dell'; // give error as decorator set writable to false
}

const person = new Person();
console.log(person.name);

export {};
