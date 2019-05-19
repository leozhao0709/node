import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response, Request } from 'express';

@Catch()
export class GlobalExceptionFilter<T> implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    console.log(exception.stack);
    const req = host.switchToHttp().getRequest() as Request;
    const res = host.switchToHttp().getResponse() as Response;
    res.status(500).render('error/500.njk');
  }
}
