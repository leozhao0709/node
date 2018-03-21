import * as supertest from 'supertest';
import { expect } from 'chai';
import { app } from '../app';
import Todo from '../models/Todo';

const request = supertest(app);

beforeEach((done) => {
    Todo.remove({}).then(() => done());
});

describe('Post /todos', () => {

    it('should create a new todo', async () => {
        const text = 'Test todo text';
        const res = await request.post('/todos').send({ text }).expect(200);
        expect(res.body.text).eqls(text);
    });

    it('should not create a todo with invalid data', async () => {
        await request.post('/todos').send({}).expect(400);

        const todos = await Todo.find();
        expect(todos.length).eq(0);
    });
});
