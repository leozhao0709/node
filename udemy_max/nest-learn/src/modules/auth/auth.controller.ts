import {
  Controller,
  Get,
  Render,
  Post,
  Res,
  Session,
  Body,
  Req,
  Param,
  UsePipes,
  ValidationPipe,
  UseFilters,
} from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { Response, Request } from 'express';
import { UserService } from '../shared/services/user/user.service';
import { UserCreateDto } from '../../dto/user/user-create.dto';
import { UserLoginDto } from '../../dto/user/user-login.dto';
import { UserNotFoundException } from '../../exceptions/user/userNotFoundException';
import { UserInvalidPasswordException } from '../../exceptions/user/userInvalidPasswordException';
import { SendEmailService } from '../shared/services/email/send-email/send-email.service';
import { environment } from '../../environment/environment';
import { UserResetPasswordTokenExpireException } from '../../exceptions/user/userResetPasswordTokenExpireException';
import { UserUpdatePasswordDto } from '../../dto/user/user-update-password.dto';
import { UserAlreadyExistingException } from '../admin/exceptions/signup-exceptions/user-already-existing.exception';
import { UserCreateDtoException } from '../admin/exceptions/signup-exceptions/user-createdto.exception';
import { SignupExceptionFilter } from '../admin/exception-filters/signup-exception.filter';

@ApiUseTags('auth')
@Controller()
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly sendEmailService: SendEmailService,
  ) {}

  @Get('/login')
  @Render('auth/login.njk')
  async getLogin(@Req() req: Request) {
    const errorMsg = await req.consumeFlash('signinError');
    const infoMsg = await req.consumeFlash('signinInfo');
    return {
      path: '/login',
      errorMsg,
      infoMsg,
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
    const errorMsg = await req.consumeFlash('signup-error');
    return {
      path: '/signup',
      errorMsg,
      oldInput: {},
    };
  }

  @Post('/signup')
  @UsePipes(
    new ValidationPipe({
      exceptionFactory: errors => {
        throw new UserCreateDtoException(errors);
      },
    }),
  )
  @UseFilters(SignupExceptionFilter)
  async postSignup(
    @Body() createUserDto: UserCreateDto,
    @Res() res: Response,
    @Session() session: Express.Session,
  ) {
    const userId = await this.userService.createUser(createUserDto);
    await this.sendEmailService.sendHtmlEmail({
      from: 'max-node-shop@shop.com',
      to: createUserDto.email,
      subject: 'Signup succeed!',
      html: '<h1>You successfully signed up at node shop!</h1>',
    });
    session.userId = userId;
    session.isLoggedIn = true;
    session.save(err => {
      if (err) {
        throw err;
      }
      res.redirect('/');
    });
  }

  @Get('reset-password')
  @Render('auth/reset-password.njk')
  async getResetPassword(@Req() req: Request) {
    const errorMsg = await req.consumeFlash('reset-password-error');
    const infoMsg = await req.consumeFlash('reset-password');
    return {
      errorMsg,
      infoMsg,
    };
  }

  @Post('reset-password')
  async postResetPassword(
    @Res() res: Response,
    @Req() req: Request,
    @Body() { email }: { email: string },
  ) {
    try {
      const token = await this.userService.resetPassword(email);
      await this.sendEmailService.sendHtmlEmail({
        from: 'max-node-shop@shop.com',
        to: email,
        subject: 'reset password',
        html: `
         <p>You request a password reset</p>
         <p>click this <a href="${environment.HOST()}/update-password/${token}">link</a> to set a new password.</p>
        `,
      });

      await req.flash('reset-password', 'an email sent!');
      return res.redirect('/reset-password');
    } catch (error) {
      if (error instanceof UserNotFoundException) {
        await req.flash('reset-password-error', 'user not found!');
        return res.redirect('/reset-password');
      }

      // tslint:disable-next-line: no-console
      console.log(error);
    }
  }

  @Get('update-password/:token')
  // @Render('auth/update-password.njk')
  async getUpdatePassword(
    @Param('token') token,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const user = await this.userService.findUserByResetPasswordToken(token);
      return res.render('auth/update-password.njk', {
        userId: user.id,
        token,
      });
    } catch (error) {
      if (error instanceof UserResetPasswordTokenExpireException) {
        await req.flash(
          'reset-password-error',
          'reset process already expire!',
        );
        return res.redirect(`/reset-password`);
      }

      if (error instanceof UserNotFoundException) {
        await req.flash('reset-password-error', 'invalid link!');
        return res.redirect(`/reset-password`);
      }

      // tslint:disable-next-line: no-console
      console.log(error);
    }
  }

  @Post('/update-password')
  async postUpdatePassword(
    @Body() updatePasswordDto: UserUpdatePasswordDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      await this.userService.updatePassword(updatePasswordDto);
      await req.flash('signinInfo', 'update password successfully!');
      return res.redirect('/login');
    } catch (error) {
      if (error instanceof UserResetPasswordTokenExpireException) {
        await req.flash(
          'reset-password-error',
          'reset process already expire!',
        );
        return res.redirect(`/reset-password`);
      }

      if (error instanceof UserNotFoundException) {
        await req.flash('reset-password-error', 'invalid link!');
        return res.redirect(`/reset-password`);
      }
    }
  }
}
