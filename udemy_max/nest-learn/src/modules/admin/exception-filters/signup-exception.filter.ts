import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { UserCreateDtoException } from '../exceptions/signup-exceptions/user-createdto.exception';
import { Response, Request } from 'express';
import { UserAlreadyExistingException } from '../exceptions/signup-exceptions/user-already-existing.exception';
import { SignupException } from '../exceptions/signup-exceptions/user-signup.exception';

@Catch(SignupException)
export class SignupExceptionFilter<T> implements ExceptionFilter {
  async catch(exception: T, host: ArgumentsHost) {
    const req = host.switchToHttp().getRequest() as Request;
    const res = host.switchToHttp().getResponse() as Response;

    if (exception instanceof UserCreateDtoException) {
      return res.render('auth/signup.njk', {
        path: '/signup',
        errorMsg: Object.values(exception.validateErrors[0].constraints),
        oldInput: req.body,
        invalidField: exception.validateErrors.map(err => err.property),
      });
    }

    if (exception instanceof UserAlreadyExistingException) {
      return res.render('auth/signup.njk', {
        path: '/signup',
        errorMsg: ['user already exist! please login directly!'],
        oldInput: req.body,
      });
    }
  }
}
