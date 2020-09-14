import http from 'http';

const server = http.createServer((req, res) => {
  const data: Uint8Array[] = [];
  req
    .on('data', (chunk) => {
      data.push(chunk);
    })
    .on('end', () => {
      const method = req.method;
      const headers = JSON.stringify(req.headers);
      const httpVersion = req.httpVersion;
      const requestUrl = req.url;

      res.writeHead(200, { 'Content-Type': 'text/html' });

      const responseData = method + ', ' + headers + ', ' + httpVersion + ', ' + requestUrl;

      res.end(responseData);
    })
    .on('error', function (err) {
      return console.log('err....', err);
    });
});

const listen = () =>
  server.listen(3000, () => {
    console.log('Server start at 3000 port');
  });

export default listen;
