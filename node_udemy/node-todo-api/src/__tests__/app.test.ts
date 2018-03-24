import * as supertest from 'supertest';
import { expect } from 'chai';
import { app } from '../app';
import Todo from '../models/Todo';
import { ObjectID } from 'bson';

const request = supertest(app);

const todos = [
    {
        _id: new ObjectID(),
        text: 'First test todo'
    },
    {
        _id: new ObjectID(),
        text: 'Second test todo',
        completed: true,
        completedAt: 333
    }
];

beforeEach(() => {
    return Todo.remove({}).then(() => {
        return Todo.insertMany(todos);
    });
});

describe('Post /todos', () => {

    it('should create a new todo', async () => {
        const text = 'Test todo text';
        const res = await request.post('/todos').send({ text }).expect(200);
        expect(res.body.text).eqls(text);
    });

    it('should not create a todo with invalid data', async () => {
        await request.post('/todos').send({}).expect(400);

        const testTodos = await Todo.find();
        expect(testTodos.length).eq(2);
    });
});

describe('Get /todos', () => {
    it('should get all todos', async () => {
        const res = await request.get('/todos').expect(200);
        expect(res.body.todos.length).eq(2);
    });
});

describe('Get /todo/:id', () => {
    it('should return todo doc', async () => {
        const res = await request.get(`/todo/${todos[0]._id}`).expect(200);
        expect(res.body.todo.text).equals(todos[0].text);
    });

    it('should return 404 if todo not found', async () => {
        await request.get(`/todo/${new ObjectID()}`).expect(404);
    });

    it('should return 404 if non-object ids', async () => {
        await request.get('/todo/123abc');
    });
});

describe('Delete /todo/:id', () => {
    it('should remove a todo', async () => {
        const res = await request.delete(`/todo/${todos[0]._id}`).expect(200);
        expect(res.body.todo.text).equals(todos[0].text);

        const todo = await Todo.findById(todos[0]._id);
        // tslint:disable-next-line:no-unused-expression
        expect(todo).to.not.exist;
    });

    it('should return 404 if todo not found', async () => {
        await request.delete(`/todo/${new ObjectID()}`).expect(404);
    });

    it('should return 404 if object id is invalid', async () => {
        await request.delete(`/todo/123add`).expect(404);
    });
});

describe('PATCH /todo/:id', () => {
    it('should update todo', async () => {
        const text = 'updated todo';
        const res = await request.patch(`/todo/${todos[0]._id}`)
            .send({ text, completed: true })
            .expect(200);
        expect(res.body.todo.text).eqls(text);
        expect(res.body.todo.completed).to.be.true;
        expect(res.body.todo.completedAt).to.be.a('number');
    });

    it('should clear completedAt when todo is not comleted', async () => {
        const text = 'todo not finish';
        const res = await request.patch(`/todo/${todos[1]._id}`).send({ text, completed: false }).expect(200);
        expect(res.body.todo.text).eqls(text);
        expect(res.body.todo.completed).to.be.false;
        expect(res.body.todo.completedAt).to.be.not.exist;
    });

    it('should clear completedAt when send invalid completed', async () => {
        const text = `test updated text`;
        const res = await request.patch(`/todo/${todos[1]._id}`).send({ text, completed: 'false' }).expect(200);
        expect(res.body.todo.completed).to.be.false;
        expect(res.body.todo.completedAt).to.be.not.exist;
    });
});