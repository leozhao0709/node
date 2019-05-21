import request = require('supertest');

describe('jsonplaceholder endpoint test', () => {
  it('should give correct userId when call posts endpoint', async () => {
    const res = await request('https://jsonplaceholder.typicode.com')
      .get('/posts/2')
      .expect(200);
    expect(res.body.userId).toBe(1);
  });
});
