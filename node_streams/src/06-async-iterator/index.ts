import { createServer } from 'node:http';
import { Readable, Transform, Writable, pipeline } from 'node:stream';
import { setTimeout } from 'node:timers/promises';

async function* myCustomReadable() {
  const arr = Array.from({ length: 10 }).map((_, i) => i);

  for (const value of arr) {
    // await setTimeout(500);
    yield Buffer.from(value.toString());
    // yield value;
  }

  // for await (const _ of setInterval(40)) {
  //   yield JSON.stringify({
  //     date: Date(),
  //   });
  // }
}

const abortController = new AbortController();

const stream = Readable.from(myCustomReadable(), {
  signal: abortController.signal,
});

// stream.on('data', (chunk: Buffer) => {
//   console.log(chunk.toString());
// });

(async () => {
  // await setTimeout(3000);
  // abortController.abort();

  stream
    .pipe(
      new Transform({
        transform(chunk: Buffer, encoding, callback) {
          const data = parseInt(chunk.toString());
          if (data <= 5) {
            callback(null, chunk);
          } else {
            callback(null);
          }
        },
      })
    )
    .pipe(
      new Writable({
        write(chunk: Buffer, encoding, callback) {
          console.log(chunk.toString());
          callback(null);
        },
      })
    );

  // stream.pause();

  // await setTimeout(3000);
  // stream.resume();
})();

// createServer(async (req, res) => {
//   const abortController = new AbortController();

//   const stream = Readable.from(myCustomReadable(), {
//     signal: abortController.signal,
//   });

//   abortController.signal.onabort = () => {
//     console.log('-----onAbort----');
//     res.end();
//   };

//   (async () => {
//     await setTimeout(3000);
//     // abortController.abort();
//     stream.pause();
//     await setTimeout(3000);
//     stream.resume();
//   })();

//   // stream.forEach((chunk: Buffer) => console.log(chunk.toString()));
//   stream.pipe(res);
// }).listen(3000, () => console.log('start at port 3000'));
