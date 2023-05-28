import request from 'supertest';
import { app } from '../jest.setup';
import { User } from '@app/users/user.entity';
import { GetUserResp } from '../../src/users/resp/GetUserResp';

describe('UserController (e2e)', () => {
  it('/users (GET)', async () => {
    let res = await request(app.getHttpServer()).get('/users');

    expect(res.statusCode).toBe(200);

    const newUser = res.body as User;

    res = await request(app.getHttpServer()).get(`/users/${newUser.id}`);
    const findUser = res.body as GetUserResp;
    expect(findUser.email).toBe(newUser.email);
  });
});
