import { Controller, Get, Render, Post, Res, Session } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { Response } from 'express';

@ApiUseTags('auth')
@Controller()
export class AuthController {
  @Get('/login')
  @Render('auth/login.njk')
  getLogin() {
    return {
      path: '/login',
    };
  }

  @Post('/login')
  postLogin(@Session() session: Express.Session, @Res() res: Response) {
    session.isLoggedIn = true;
    res.redirect('/');
  }

  @Post('/logout')
  postLogout(@Session() session: Express.Session, @Res() res: Response) {
    session.destroy(err => {
      if (err) {
        throw Error(err);
      }
      res.redirect('/');
    });
  }
}
