import fs from 'fs';
import path from 'path';

const readStream = fs.createReadStream(path.resolve(__dirname, 'index.ts'), { encoding: 'utf-8' });
const writeStream = fs.createWriteStream(path.resolve(__dirname, 'fileTemp', 'tempIndex.ts'), { encoding: 'utf-8' });

readStream.on('data', (chunk) => {
  writeStream.write(chunk, (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(chunk);
  });
});

// const data: (string | Buffer)[] = [];
// readStream
//   .on('open', (fd) => {
//     console.log('....file descriptor...', fd);
//   })
//   .on('ready', () => {
//     console.log('...ready...');
//   })
//   .on('data', (chunk) => {
//     data.push(chunk);
//     console.log(chunk);
//   })
//   .on('end', () => {
//     console.log('...end...');
//   })
//   .on('close', () => {
//     console.log('...close...');
//   })
//   .on('error', (err) => {
//     console.error(err);
//   });
