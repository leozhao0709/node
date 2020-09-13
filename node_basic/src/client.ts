import http from 'http';

http
  .request(
    {
      host: 'localhost',
      port: 3000,
      method: 'get',
      path: '/login?username=zhangsan&password=hello',
    },
    (response) => {
      const responseData: Uint8Array[] = [];
      response
        .on('data', (chunk) => {
          responseData.push(chunk);
        })
        .on('end', () => {
          console.log(responseData.toString());
        });
    }
  )
  .end(); // must call this end!!
