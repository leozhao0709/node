type Greeting = `Hi${string}`;

const pringGreeting = (greeting: Greeting) => {
  console.log(greeting);
};

//No errors:
pringGreeting("Hi, John!");
pringGreeting("Hi!");
pringGreeting("Hi, everybody");

//This should have errors:
pringGreeting("Hey, dude!");
pringGreeting("Dude, hi!");
