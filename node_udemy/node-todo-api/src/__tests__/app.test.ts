import * as supertest from 'supertest';
import { expect } from 'chai';
import { app } from '../app';

const request = supertest(app);

describe('Post /todos', () => {
    it('should create a new todo', () => {
        const text = 'Test todo text';

        return request
            .post('/todos')
            .send({ text })
            .expect(200)
            .then((res) => {
                expect(res.body.text).to.equal(text);
            });
    });
});
