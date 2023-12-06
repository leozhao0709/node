import path from 'node:path';
import { Duplex, PassThrough } from 'node:stream';
import { createReadStream, createWriteStream } from 'node:fs';

const passThrough = new PassThrough();

passThrough.on('data', (chunk: Buffer) => {
  console.log('on data: ', chunk.toString());
});

const duplex = Duplex.from({
  readable: createReadStream(path.resolve(__dirname, '../../tmp/03-my.csv')),
  writable: createWriteStream(
    path.resolve(__dirname, '../../tmp/04-duplex.csv')
  ),
});

duplex.pipe(passThrough).pipe(duplex);
