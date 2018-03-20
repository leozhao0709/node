import * as express from 'express';
import * as bodyParser from 'body-parser';
import Todo from './models/Todo';
import mongoose from 'mongoose';
import { dbserverUrl, dbName } from './db/mongoose';

mongoose.connect(`${dbserverUrl}${dbName}`);

const port = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    const todo = new Todo(req.body);

    todo.save()
        .then((result) => {
            res.send(result);
        }).catch(err => {
            res.status(400).send(err);
        });
});

app.listen(3000, () => {
    // tslint:disable-next-line:no-console
    console.log(`Server is up on ${port}`);
});

export default app;