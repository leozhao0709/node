import { Router } from 'express';
import { User, IUser } from '../models/User';
import { auth } from '../middleware/auth';

export const usersApi = Router();

usersApi.post('/', (req, res) => {
    const { email, password } = req.body;

    const user = new User({ email, password });

    user.generateAuthToken()
        .then(token => {
            res.header('x-auth', token).send(user);
        })
        .catch(err => {
            res.status(400).send(err);
        });
});

usersApi.get('/me', auth, (req, res) => {
    res.send(req.params.user);
});

usersApi.post('/login', (req, res) => {
    const { email, password } = req.body;

    User.findByCrediential(email, password)
        .then(user => {
            return user.generateAuthToken().then(token => {
                res.header('x-auth', token).send(user);
            });
        })
        .catch(_ => {
            res.status(400).send();
        });
});

usersApi.delete('/me/token', auth, (req, res) => {
    (<IUser>req.params.user).removeToken(req.params.token).then(() => {
        res.status(200).send();
    }).catch(_ => {
        res.status(400).send();
    });
});
