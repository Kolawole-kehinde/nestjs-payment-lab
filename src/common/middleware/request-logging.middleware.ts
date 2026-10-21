
import {
  Injectable,
  Logger,
  NestMiddleware,
} from '@nestjs/common';
import type { NextFunction, Response } from 'express';
import { randomUUID } from 'node:crypto';

export interface  RequestWithId extends Request {
  requestId: string;
}

@Injectable()
export class RequestLoggingMiddleware implements NestMiddleware {
  private readonly logger = new Logger(RequestLoggingMiddleware.name);

  use(
    request: RequestWithId,
    response: Response,
    next: NextFunction,
  ): void {
    const requestId = randomUUID();
    const startTime = Date.now();

    request.requestId = requestId;
    response.setHeader('X-Request-Id', requestId);

    response.on('finish', () => {
      const duration = Date.now() - startTime;

      this.logger.log(
        JSON.stringify({
          requestId,
          method: request.method,
          path: request.url,
          statusCode: response.statusCode,
          durationMs: duration,
        }),
      );
    });

    next();
  }
}
