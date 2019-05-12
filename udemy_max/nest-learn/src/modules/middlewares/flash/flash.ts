import { Request, Response, NextFunction } from 'express';

export const flash = (req: Request, response: Response, next: NextFunction) => {
  req.flash = (event, message) => {
    return new Promise((res, rej) => {
      if (!req.session.flash) {
        req.session.flash = {};
      }
      if (!req.session.flash[event]) {
        req.session.flash[event] = [];
      }
      req.session.flash[event].push(message);
      req.session.save(err => {
        if (err) {
          rej(err);
        }
        res();
      });
    });
  };

  req.consumeFlash = event => {
    return new Promise((res, rej) => {
      let messages: string[] = [];
      if (req.session.flash && req.session.flash[event]) {
        messages = [...req.session.flash[event]];
        req.session.flash = null;
      }
      req.session.save(err => {
        if (err) {
          rej(err);
        }
        res(messages);
      });
    });
  };

  next();
};
