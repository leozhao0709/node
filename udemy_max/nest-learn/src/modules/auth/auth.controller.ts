import {
  Controller,
  Get,
  Render,
  Post,
  Res,
  Session,
  Body,
} from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { Response } from 'express';
import { UserService } from '../shared/services/user/user.service';
import { CreateUserDto } from '../../dto/user/create-user.dto';
import { UserAlreadyExistingException } from '../../exceptions/user/userAlreadyExistingException';

@ApiUseTags('auth')
@Controller()
export class AuthController {
  constructor(private readonly userService: UserService) {}

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

    // we save session in db, so we need to wait it finish saving, then redirect
    session.save(err => {
      // tslint:disable-next-line: no-console
      console.log(err);
      res.redirect('/');
    });
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

  @Get('/signup')
  @Render('auth/signup.njk')
  getSignup() {
    return {
      path: '/signup',
    };
  }

  @Post('/signup')
  async postSignup(
    @Body() createUserDto: CreateUserDto,
    @Res() res: Response,
    @Session() session: Express.Session,
  ) {
    try {
      const user = await this.userService.createUser(createUserDto);
      console.log('...userid...', user.id);
      session.user = user;
      console.log('...session userid...', session.user.id);
      session.isLoggedIn = true;
      session.save(err => {
        if (err) {
          throw err;
        }
        res.redirect('/');
      });
    } catch (error) {
      if (error instanceof UserAlreadyExistingException) {
        res.redirect('/signup');
      }
      // tslint:disable-next-line: no-console
      console.log(error);
    }
  }
}
