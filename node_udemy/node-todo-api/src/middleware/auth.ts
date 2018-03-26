import { User } from '../models/User';
import { NextFunction, Request, Response } from 'express';

export const auth = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('x-auth')!;

    User.findByToken(token)
        .then(user => {
            if (!user) {
                throw 'user not found';
            }

            req.params.user = user;
            req.params.token = token;

            next();
        })
        .catch(_ => {
            res.status(401).send();
        });
};
