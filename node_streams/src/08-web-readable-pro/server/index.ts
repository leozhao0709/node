import { createReadStream } from 'fs';
import { createServer } from 'http';
import path from 'path';

createServer((req, res) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': '*',
  };
  res.writeHead(200, headers);
  createReadStream(
    path.resolve(__dirname, '../../../tmp/08-web-readable.json')
  ).pipe(res);
}).listen(3000, () => {
  console.log(`start at port 3000`);
});
