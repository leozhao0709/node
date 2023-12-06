const url = 'http://localhost:3000';

(async () => {
  const res = await fetch(url);
  const abortController = new AbortController();

  setTimeout(() => {
    abortController.abort();
  }, 100);

  try {
    await res.body.pipeThrough(new TextDecoderStream()).pipeTo(
      new WritableStream({
        write(chunk) {
          // eslint-disable-next-line no-console
          console.log(chunk);
        },
      }),
      { signal: abortController.signal }
    );
  } catch (error) {
    console.log(error);
    if (!error.message.includes('abort')) throw error;
  }
})();
