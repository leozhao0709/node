import { ObjectID } from 'bson';
import { Todo } from '../../models/Todo';

export const todos = [
    {
        _id: new ObjectID().toHexString(),
        text: 'First test todo'
    },
    {
        _id: new ObjectID().toHexString(),
        text: 'Second test todo',
        completed: true,
        completedAt: 333
    }
];

export const populateTodos = () => {
    return Todo.remove({}).then(() => {
        return Todo.insertMany(todos);
    });
};