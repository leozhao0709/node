type Arr<T> = [T, ...Array<T>];

const processArray = (input: Arr<string>) => {
  //Doing some cool stuff...
};

processArray(["bla"]);
processArray(["bla", "blabla", "blablabla"]);

//This should error
processArray([]);

export {};
