import net from 'net';

const listen = () => {
  const server = net.createServer((socket: net.Socket) => {
    console.log('client connected...');
    console.log('local port: ' + socket.localPort);
    console.log('local address: ' + socket.localAddress);
    console.log('remote port: ' + socket.remotePort);
    console.log('remote family: ' + socket.remoteFamily);
    console.log('remote address: ' + socket.remoteAddress);

    // set max connection
    server.maxConnections = 2;

    // get current server connections. If already get max connections, then call back won't be called!
    server.getConnections((err, count) => {
      if (err) {
        console.error(err);
      }
      console.log('count is', count);
    });

    const address = socket.address();
    const message = 'server address is ' + JSON.stringify(address);
    socket.write(message, (err) => {
      if (err) {
        console.error(err);
      }
    });

    socket
      .on('data', (data: Buffer) => {
        console.log(`receive ${data.length} bytes
${data.toString()}`);
      })
      .on('end', () => {
        console.log('socket end...');
      });
  });

  server
    .listen(8888, () => {
      console.log('server is listening...');

      const address = server.address();
      console.log(address);
    })
    .on('close', () => {
      console.log('server is closing...');
    })
    .on('error', (err) => {
      console.error(err);
    });
};

export default listen;
