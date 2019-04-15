import fs from 'fs';
import http from 'http';

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === '/') {
    res.write(`
      <html>
      <head>
        <title>Enter Message</title>
      </head>
      <body>
        <form action="/message" method="POST">
          <input type="text" name="messageInput"/>
          <button type="submit">submit</button>
        </form>
      </body>
      </html>
    `);
    return res.end();
  }

  if (url === '/message' && method === 'POST') {
    const body: Uint8Array[] = [];
    req.on('data', chunk => {
      // tslint:disable-next-line: no-console
      console.log(chunk);
      body.push(chunk);
    });

    return req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split('=')[1];
      fs.writeFile('message.txt', message, err => {
        if (!err) {
          res.statusCode = 302;
          res.setHeader('Location', '/');
          return res.end();
        }
      });
    });
  }

  res.write(`
    <html>
    <head>
      <title>My first node page</title>
    </head>
    <body>
      <h1>Hello from my Node.js Server!</h1>
    </body>
    </html>
  `);
  res.end();
});

server.listen(5000, () => {
  // tslint:disable-next-line: no-console
  console.log('server start on 5000 port');
});
