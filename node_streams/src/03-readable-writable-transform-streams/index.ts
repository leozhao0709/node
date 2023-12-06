import { randomUUID } from 'node:crypto';
import { createWriteStream } from 'node:fs';
import path from 'node:path';
import { Readable, Transform } from 'node:stream';

const readable = new Readable({
  read() {
    for (let i = 1; i <= 1000000; i++) {
      const person = {
        id: randomUUID(),
        name: `Lei-${i}`,
      };

      this.push(JSON.stringify(person));
    }

    // notify that data is complete
    this.push(null);
  },
});

let insertCsvHeader = true;

const mapFields = new Transform({
  transform(chunk: Buffer, encoding, callback) {
    console.log(chunk.toString(), chunk.toString().length);
    const person = JSON.parse(chunk.toString()) as { id: string; name: string };
    let result = `${person.id},${person.name}\n`;
    if (insertCsvHeader) {
      result = `id,name\n${result}`;
      insertCsvHeader = false;
    }

    callback(null, result);
  },
});

// readable
//   .pipe(mapFields)
//   .pipe(createWriteStream(path.resolve(__dirname, '../../tmp/03-my.csv')))
//   .on('finish', () => {
//     console.log('task finished...');
//   });

readable
  .pipe(
    createWriteStream(path.resolve(__dirname, '../../tmp/08-web-readable.json'))
  )
  .on('finish', () => {
    console.log('task finished...');
  });
