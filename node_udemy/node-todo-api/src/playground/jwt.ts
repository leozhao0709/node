import * as jwt from 'jsonwebtoken';

const data = {
    id: 10
};

const token = jwt.sign(data, 'abc123');
const dataDeocde = jwt.verify(token + 'aaa', 'abc123');

// tslint:disable-next-line:no-console
console.log(token);

// tslint:disable-next-line:no-console
console.log(dataDeocde);