import { createServer, Socket } from 'node:net';
import { randomUUID } from 'node:crypto';

const server = createServer();

const user = new Map<string, Socket>();

const notifyOtherUsers = (userId: string, data: string) => {
  [...user.keys()]
    .filter((id) => id !== userId)
    .forEach((id) => user.get(id)?.write(data));
};

server.listen(3000, () => {
  console.log('server start at port 3000');
});

server.on('connection', (socket) => {
  const id = randomUUID();
  console.log(`---socket ${id}--connected--`);
  user.set(id, socket);

  socket.on('data', (data) => {
    notifyOtherUsers(
      id,
      JSON.stringify({
        id: id.slice(0, 4),
        data: data.toString(),
      })
    );
  });

  socket.on('close', () => {
    console.log('---socket closed---');
  });
});
