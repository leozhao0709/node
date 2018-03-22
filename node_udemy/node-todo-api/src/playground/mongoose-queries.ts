import Todo from '../models/Todo';
import { ObjectID } from 'mongodb';

const id = '5ab32f40dafe069d398e065aaa';

if (!ObjectID.isValid(id)) {
    // tslint:disable-next-line:no-console
    console.log(`ID not valid`);
}

Todo.find({
    _id: id
}).then(todos => {
    // tslint:disable-next-line:no-console
    console.log('Todos ', todos);
});

Todo.findOne({
    _id: id
}).then(todo => {
    // tslint:disable-next-line:no-console
    console.log('Todo ', todo);
});

Todo.findById(id).then(todo => {
    // tslint:disable-next-line:no-console
    console.log(todo);
}).catch(e => {
    // tslint:disable-next-line:no-console
    console.log(e);
});
