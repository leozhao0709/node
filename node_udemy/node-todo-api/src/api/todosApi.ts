import { Router } from 'express';
import { Todo } from '../models/Todo';
import { ObjectID } from 'bson';
import { auth } from '../middleware/auth';

export const todosApi = Router();

todosApi.post('/', auth, (req, res) => {
    const todo = new Todo({
        text: req.body.text,
        _creator: req.params.user._id
    });

    todo.save()
        .then((result) => {
            res.send(result);
        }).catch(err => {
            res.status(400).send(err);
        });
});

todosApi.get('/', auth, (req, res) => {
    Todo.find({
        _creator: req.params.user._id
    })
        .then(todos => {
            res.send({ todos });
        })
        .catch(err => {
            res.status(400).send(err);
        })
        ;
});

todosApi.get('/:id', auth, (req, res) => {
    const id = req.params.id;

    if (!ObjectID.isValid(id)) {
        res.status(404).send();
    }

    Todo.findOne({
        _id: id,
        _creator: req.params.user._id
    })
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

todosApi.delete('/:id', auth, (req, res) => {
    const id = req.params.id;

    if (!ObjectID.isValid(id)) {
        res.status(404).send();
    }

    Todo.findOneAndRemove({
        _id: id,
        _creator: req.params.user._id
    })
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

todosApi.patch('/:id', auth, (req, res) => {
    const id = req.params.id;

    if (!ObjectID.isValid(id)) {
        res.status(404).send();
    }

    let { text, completed } = req.body;
    let completedAt;

    if (typeof (completed) === 'boolean' && completed) {
        completedAt = new Date().getTime();
    } else {
        completed = false;
        completedAt = null;
    }
    Todo.findOneAndUpdate(
        {
            _id: id,
            _creator: req.params.user._id
        },
        { $set: { text, completed, completedAt } },
        { new: true })
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
