import { ObjectID } from 'mongodb';
import * as jwt from 'jsonwebtoken';
import { environment } from '../../environment/environment';
import { User } from '../../models/User';

const userOneId = new ObjectID().toHexString();
const userTwoId = new ObjectID().toHexString();

export const users = [
    {
        _id: userOneId,
        email: 'testOne@test.com',
        password: 'testOne',
        tokens: [{
            access: 'auth',
            token: jwt.sign({ _id: userOneId, access: 'auth' }, environment.AUTH_SECRET)
        }]
    },
    {
        _id: userTwoId,
        email: 'testTwo@test.com',
        password: 'testtwo'
    }
];

export const populateUers = () => {
    return User.remove({}).then(() => {
        const userOne = new User(users[0]).save();
        const userTwo = new User(users[1]).save();

        return Promise.all([userOne, userTwo]);
    });
};