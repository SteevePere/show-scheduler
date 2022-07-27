import {
  CallHandler,
  ConflictException,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { QueryFailedError } from 'typeorm';

@Injectable()
export class TypeOrmConflictErrorInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        if (error.response?.error instanceof QueryFailedError) {
          if (error.response?.error?.code === '23505') {
            throw new ConflictException(error.response?.error?.detail);
          } else {
            throw error;
          }
        } else {
          throw error;
        }
      }),
    );
  }
}
