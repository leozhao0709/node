interface Person {
  name: string;
  age?: number;
}

const person: Person = {
  name: 'dell',
  age: 20,
};

const getInfo = <T extends keyof Person>(key: T) => {
  return person[key];
};

console.log(getInfo('name'));
