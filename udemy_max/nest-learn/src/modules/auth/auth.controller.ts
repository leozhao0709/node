import {
  Controller,
  Get,
  Render,
  Post,
  Res,
  Session,
  Body,
  Req,
} from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { Response, Request } from 'express';
import { UserService } from '../shared/services/user/user.service';
import { UserCreateDto } from '../../dto/user/user-create.dto';
import { UserAlreadyExistingException } from '../../exceptions/user/userAlreadyExistingException';
import { UserLoginDto } from '../../dto/user/user-login.dto';
import { UserNotFoundException } from '../../exceptions/user/userNotFoundException';
import { UserInvalidPasswordException } from '../../exceptions/user/userInvalidPasswordException';

@ApiUseTags('auth')
@Controller()
export class AuthController {
  constructor(private readonly userService: UserService) {}

  @Get('/login')
  @Render('auth/login.njk')
  async getLogin(@Req() req: Request) {
    const errorMsg = await req.consumeFlash('signinError');
    return {
      path: '/login',
      errorMsg,
    };
  }

  @Post('/login')
  async postLogin(
    @Session() session: Express.Session,
    @Body() userLoginDto: UserLoginDto,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    try {
      const userId = await this.userService.loginUser(userLoginDto);
      session.isLoggedIn = true;
      session.userId = userId;
      // we save session in db, so we need to wait it finish saving, then redirect
      session.save(err => {
        if (err) {
          throw err;
        }
        res.redirect('/');
      });
    } catch (error) {
      if (error instanceof UserNotFoundException) {
        await req.flash('signinError', 'user not found!');
        return res.redirect('/login');
      }

      if (error instanceof UserInvalidPasswordException) {
        await req.flash('signinError', 'invalid password!');
        return res.redirect('/login');
      }

      // tslint:disable-next-line: no-console
      console.log(error);
    }
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
  async getSignup(@Req() req: Request) {
    const errorMsg = await req.consumeFlash('signupError');
    return {
      path: '/signup',
      errorMsg,
    };
  }

  @Post('/signup')
  async postSignup(
    @Body() createUserDto: UserCreateDto,
    @Res() res: Response,
    @Req() req: Request,
    @Session() session: Express.Session,
  ) {
    try {
      const userId = await this.userService.createUser(createUserDto);
      session.userId = userId;
      session.isLoggedIn = true;
      session.save(err => {
        if (err) {
          throw err;
        }
        res.redirect('/');
      });
    } catch (error) {
      if (error instanceof UserAlreadyExistingException) {
        await req.flash(
          'signupError',
          'user already exist! please login directly!',
        );
        return res.redirect('/signup');
      }
      // tslint:disable-next-line: no-console
      console.log(error);
    }
  }
}
