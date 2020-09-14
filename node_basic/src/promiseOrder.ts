setTimeout(() => {
  console.log(333);
}, 1000);

setTimeout(() => {
  console.log(111);
}, 0);

new Promise((resolve, reject) => {
  console.log(444);
  resolve();
  console.log(555);
}).then(() => console.log(666));

console.log(777);

async function test1() {
  console.log('test1');
  await test2();
  console.log('test1 last');
}

async function test2() {
  console.log('test2');
}

test1();

// expected: 444 555 777 'test1' 'test2' 666 'test1 last'  111 333
