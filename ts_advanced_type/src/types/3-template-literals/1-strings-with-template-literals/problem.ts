type Greeting = any;

const pringGreeting = (greeting: Greeting) => {
  console.log(greeting);
};

//No errors:
pringGreeting("hi, John!");
pringGreeting("hi!");
pringGreeting("hi, everybody");

//This should have errors:
pringGreeting("hey, dude!");
pringGreeting("👋");
pringGreeting("dude, hi!");

export {};
