const buf = Buffer.alloc(128);

const writeLength = buf.write('abc你好', 'utf8');
console.log(writeLength); // 9

const buffer1 = Buffer.from('hello');
const buffer2 = Buffer.from('world');
const buffer3 = Buffer.from('welcome');
const buffer4 = Buffer.from('你好');

const bufArray = [buffer1, buffer2, buffer3, buffer4];
const bufferResult = Buffer.concat(bufArray);
console.log(bufferResult.toString());
console.log(bufferResult.toJSON());

const isBuf = Buffer.isBuffer(bufferResult);
console.log(isBuf);
