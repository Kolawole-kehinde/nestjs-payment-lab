
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { finalize, Observable } from 'rxjs';

@Injectable()
export class ResponseTimeInterceptor implements NestInterceptor {
  private readonly logger = new Logger(ResponseTimeInterceptor.name);

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<unknown> {
    const startTime = Date.now();

    return next.handle().pipe(
      finalize(() => {
        const duration = Date.now() - startTime;

        this.logger.log(
          `Handler execution finished in ${duration}ms`,
        );
      }),
    );
  }
}



// Understand the key idea:
// - ExecutionContext provides information about the current handler and request.
// - next.handle() passes execution to the controller handler and returns an Observable.
// - finalize() runs when the Observable completes, errors, or is unsubscribed.
// - Date.now() measures the elapsed time from when the handler execution starts
//   until the Observable finishes.
// - Logger records the execution time in the server console, even if the handler fails.