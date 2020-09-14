import { Socket } from 'net';

const socket = new Socket();

socket.connect(
  {
    host: 'localhost',
    port: 8888,
  },
  () => {
    console.log('connected to the localhost:8888');

    socket.write('message from client');
  }
);

socket
  .on('data', (data) => {
    console.log('data from server: ' + data.toString());
    // send data to server
    socket.write('hello world');
  })
  .on('end', () => {
    console.log('socket end...');
  })
  .on('close', (err) => {
    if (err) {
      console.error(err);
    }
  });
