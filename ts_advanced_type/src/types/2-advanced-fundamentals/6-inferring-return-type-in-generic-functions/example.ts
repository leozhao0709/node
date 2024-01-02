function randomNumber(salt: number) {
  return salt + 5;
}

type NumberType = ReturnType<typeof randomNumber>;

processNumber(randomNumber(25));

function processNumber(number: NumberType) {
  //some logic
}
