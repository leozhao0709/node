import { Readable } from 'node:stream';
import { ReadableStream, TransformStream } from 'node:stream/web';
import { setInterval } from 'node:timers/promises';

const readableStream = new ReadableStream({
  async start(controller) {
    for await (const _ of setInterval(500)) {
      controller.enqueue(`Hello, ${new Date().toISOString()}`);
    }
  },
});

const readable = Readable.fromWeb(readableStream);

setTimeout(() => {
  readableStream.cancel();
}, 3000);

readableStream
  .pipeThrough(
    new TransformStream({
      transform(chunk: string, controller) {
        controller.enqueue(chunk.toUpperCase());
      },
    })
  )
  .pipeTo(
    new WritableStream({
      write(chunk: string, controller) {
        console.log(chunk);
      },
      close() {
        console.log(`finish writing`);
      },
    })
  );
