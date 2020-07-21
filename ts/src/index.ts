interface Person {
  name: string;
  age?: number;
  [prop: string]: any; // can have any extra property
}

const person: Person = {
  name: 'dell',
  sex: 'male',
  grade: 'A',
};

console.log(person);
