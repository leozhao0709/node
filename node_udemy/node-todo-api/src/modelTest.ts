import * as mongoose from 'mongoose';
import Todo from './model/Todo';
import TodoModel from './model/Todo';

const serverUrl = `mongodb://localhost:27017/`;
const dbName = 'TodoApp';

mongoose.connect(`${serverUrl}${dbName}`);

const otherTodo = new TodoModel({
    text: 'otherTodo'
});

otherTodo.save()
    .then(res => {
        // tslint:disable-next-line:no-console
        console.log(res);
    })
    .catch(err => {
        // tslint:disable-next-line:no-console
        console.log(err);
    });