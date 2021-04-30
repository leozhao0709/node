import server from 'app/server';

const port = 3001;

server.listen(port, () => {
  console.log(`server start at http://localhost:${port}`);
});
