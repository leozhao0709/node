import * as supertest from 'supertest';
import { expect } from 'chai';
import { app } from '../app';
import { ObjectID } from 'bson';
import { Todo } from '../models/Todo';
import { populateTodos, todos } from './seed/todo.seed';
import { populateUers, users } from './seed/user.seed';
import { User } from '../models/User';

const request = supertest(app);

beforeEach(populateUers);
beforeEach(populateTodos);

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

describe('Get /todos/:id', () => {
    it('should return todo doc', async () => {
        const res = await request.get(`/todos/${todos[0]._id}`).expect(200);
        expect(res.body.todo.text).equals(todos[0].text);
    });

    it('should return 404 if todo not found', async () => {
        await request.get(`/todos/${new ObjectID()}`).expect(404);
    });

    it('should return 404 if non-object ids', async () => {
        await request.get('/todos/123abc');
    });
});

describe('Delete /todos/:id', () => {
    it('should remove a todo', async () => {
        const res = await request.delete(`/todos/${todos[0]._id}`).expect(200);
        expect(res.body.todo.text).equals(todos[0].text);

        const todo = await Todo.findById(todos[0]._id);
        // tslint:disable-next-line:no-unused-expression
        expect(todo).to.not.exist;
    });

    it('should return 404 if todo not found', async () => {
        await request.delete(`/todos/${new ObjectID()}`).expect(404);
    });

    it('should return 404 if object id is invalid', async () => {
        await request.delete(`/todos/123add`).expect(404);
    });
});

describe('PATCH /todos/:id', () => {
    it('should update todo', async () => {
        const text = 'updated todo';
        const res = await request.patch(`/todos/${todos[0]._id}`)
            .send({ text, completed: true })
            .expect(200);
        expect(res.body.todo.text).eqls(text);
        expect(res.body.todo.completed).to.be.true;
        expect(res.body.todo.completedAt).to.be.a('number');
    });

    it('should clear completedAt when todo is not comleted', async () => {
        const text = 'todo not finish';
        const res = await request.patch(`/todos/${todos[1]._id}`).send({ text, completed: false }).expect(200);
        expect(res.body.todo.text).eqls(text);
        expect(res.body.todo.completed).to.be.false;
        expect(res.body.todo.completedAt).to.be.not.exist;
    });

    it('should clear completedAt when send invalid completed', async () => {
        const text = `test updated text`;
        const res = await request.patch(`/todos/${todos[1]._id}`).send({ text, completed: 'false' }).expect(200);
        expect(res.body.todo.completed).to.be.false;
        expect(res.body.todo.completedAt).to.be.not.exist;
    });
});

describe('GET /users/me', () => {
    it('should return user if authenticated', async () => {
        const res = await request.get('/users/me').set('x-auth', users[0].tokens![0].token).expect(200);

        expect(res.body._id).eqls(users[0]._id);
        expect(res.body.email).eqls(users[0].email);
    });

    it('should return 401 if not authenticated', async () => {
        const res = await request.get('/users/me').expect(401);
        expect(res.body).to.be.empty;
    });
});

describe('POST /users', () => {
    it('should create a user', async () => {
        const email = 'testExample@example.com';
        const password = 'examplePassword';
        const res = await request.post('/users').send({ email, password }).expect(200);
        expect(res.header['x-auth']).to.be.exist;
        expect(res.body._id).to.be.exist;
        expect(res.body.email).eqls(email);

        const user = await User.findOne({ email });
        expect(user!.email).equals(email);
        expect(user!._id.toString()).equal(res.body._id);
        expect(user!.password).not.eqls(password);
    });

    it('should return validation error if request invalid', async () => {
        await request.post('/users').send({ email: 'test123', password: '123456' }).expect(400);
    });

    it('should not create user if email in use', async () => {
        await request.post('/users').send({ email: users[0]._id, password: users[0].password }).expect(400);
    });
});

describe('POST /users/login', () => {
    it('should login user and return auth token', async () => {
        const res = await request.post('/users/login')
            .send({ email: users[1].email, password: users[1].password })
            .expect(200);
        expect(res.header['x-auth']).to.be.exist;

        const user = await User.findById(users[1]._id);
        expect(user!.tokens[0]).include({
            access: 'auth',
            token: res.header['x-auth']
        });
    });

    it('should reject invalid login', async () => {
        const res = await request.post('/users/login')
            .send({ email: users[1].email, password: users[1].password + '1' })
            .expect(400);
        expect(res.header['x-auth']).to.be.not.exist;

        const user = await User.findById(users[1]._id);
        expect(user!.tokens.length).eqls(0);
    });
});

describe('DELETE /users/me/token', () => {
    it('should remove auth token on logout', async () => {
        await request.delete('/users/me/token').set('x-auth', users[0].tokens![0].token).expect(200);

        const user = await User.findById(users[0]._id);
        expect(user!.tokens.length).eqls(0);
    });
});
