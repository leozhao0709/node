import * as express from 'express';
import * as bodyParser from 'body-parser';
import Todo from './models/Todo';
import { ObjectID } from 'bson';

const port = process.env.PORT || 3000;

export const app = express();

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

app.get('/todos', (_, res) => {
    Todo.find()
        .then(todos => {
            res.send({ todos });
        })
        .catch(err => {
            res.status(400).send(err);
        })
        ;
});

app.get('/todo/:id', (req, res) => {
    const id = req.params.id;

    if (!ObjectID.isValid(id)) {
        res.status(404).send();
    }

    Todo.findById(id)
        .then(todo => {
            if (!todo) {
                return res.status(404).send();
            }

            res.send({ todo });
        })
        .catch(_ => {
            res.status(400).send();
        });
});

app.delete('/todo/:id', (req, res) => {
    const id = req.params.id;

    if (!ObjectID.isValid(id)) {
        res.status(404).send();
    }

    Todo.findByIdAndRemove(id)
        .then(todo => {
            if (!todo) {
                res.status(404).send();
            }

            res.send({ todo });
        })
        .catch(_ => {
            res.status(400).send();
        });
});

app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`Server is up on ${port}`);
});
