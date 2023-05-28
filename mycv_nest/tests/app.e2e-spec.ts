import request from 'supertest';
import { app } from './jest.setup';

describe('AppController (e2e)', () => {
  it('/ (GET)', async () => {
    const res = await request(app.getHttpServer()).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe('Hello World!');
  });
});
