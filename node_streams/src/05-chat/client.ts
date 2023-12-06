import { Writable } from 'node:stream';
import { connect } from 'net';

const writable = new Writable({
  write(chunk: Buffer, encoding, callback) {
    // console.log(`--------${chunk.toString()}`);
    const { id, data } = JSON.parse(chunk.toString());
    console.log(`message from ${id}: ${data}`);
    callback(null);
  },
});

process.stdin.pipe(connect(3000)).pipe(writable);
