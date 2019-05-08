import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  NotFoundException,
  HttpException,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const req = ctx.getRequest() as Request;
    const res = ctx.getResponse() as Response;
    const status = exception.getStatus();

    if (exception instanceof NotFoundException) {
      return res.render('404.njk');
    }

    if (exception instanceof UnauthorizedException) {
      return res.render('auth/login.njk', {
        unAuthorized: true,
        path: '/login',
      });
    }

    return res.status(status).json({
      statusCode: status,
      message: exception.message,
      timestamp: new Date().toUTCString(),
      path: req.url,
    });
  }
}
