type Arr = any;

const processArray = (input: Arr<string>) => {};

processArray(["bla"]);
processArray(["bla", "blabla", "blablabla"]);

//This should error
processArray([]);

export {};
