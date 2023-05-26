import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Observable, map } from 'rxjs';
import { Constructor } from '../../types/helper.js';

@Injectable()
export class SerializeInterceptor implements NestInterceptor {
  constructor(private readonly respClass: Constructor<any>) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((resp) => {
        return plainToInstance(this.respClass, resp, {
          excludeExtraneousValues: true,
        });
      })
    );
  }
}
