import { Readable } from 'node:stream';
import { setInterval } from 'node:timers/promises';
import { TextDecoderStream, TransformStream } from 'node:stream/web';

async function* myReadable() {
  for await (const _ of setInterval(500)) {
    yield Buffer.from(new Date().toISOString());
  }
}

const readableStream = Readable.toWeb(Readable.from(myReadable()));

readableStream
  .pipeThrough(new TextDecoderStream())
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
