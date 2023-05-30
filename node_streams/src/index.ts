import { randomUUID } from 'node:crypto';
import { Readable } from 'node:stream';

const readable = new Readable({
  read() {
    for (let i = 1; i <= 1e6; i++) {
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

readable.pipe(process.stdout);
