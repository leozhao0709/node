import { Duplex, Transform } from 'node:stream';

const server = new Duplex({
  // write will call Duplex write immediately
  write(chunk, encoding, callback) {
    console.log(`[server write] ${chunk}`);
    callback(null);
  },
  read(size) {
    console.log('---[server read]---');
    for (let i = 0; i < 5; i++) {
      this.push(`[within server read] ${i}`);
    }
    this.push(null); // complete flag
  },
});

//write will write to write stream immediately
server.write('[duplex] server write');
server.write('[duplex] server write2');

// // push will queue the data to write stream.
server.push('[duplex] this is readable');
// server.push('[duplex] this is readable2');

const transformToUppercase = new Transform({
  // objectMode: true,
  transform(chunk: Buffer, encoding, callback) {
    callback(null, 'on transform' + chunk.toString().toUpperCase());
  },
});

// on('data') will start the read stream and pipe the queued data.
server.on('data', (chunk: Buffer) => {
  console.log('on data', chunk.toString());
});

// server.pipe or server.on('data') will start the read stream and pipe the queued data.
server.pipe(transformToUppercase).pipe(server); // will call server write again
