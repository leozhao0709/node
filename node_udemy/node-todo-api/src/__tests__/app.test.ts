import * as supertest from 'supertest';
import * as app from '../app';

const request = supertest(app);

describe('Post /todos', () => {
    test('should create a new todo', () => {
        const text = 'Test todo text';

        return request
            .post('/todos')
            .send(text)
            .expect(200)
            .then((res) => {
                expect(res.body.text).toBe(text);
            })
            ;
    });
});
