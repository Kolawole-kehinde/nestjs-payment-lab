
import {Injectable, Logger, NestMiddleware,
} from '@nestjs/common';
import type { NextFunction, Request, Response } from 'express';
import { randomUUID } from 'node:crypto';

@Injectable()
export class RequestLoggingMiddleware implements NestMiddleware {
  private readonly logger = new Logger(RequestLoggingMiddleware.name);

  use(
    request: Request,
    response: Response,
    next: NextFunction,
  ): void {
    const requestId = randomUUID();
    const startTime = Date.now();

    response.setHeader('X-Request-Id', requestId);

    response.on('finish', () => {
      const duration = Date.now() - startTime;

      this.logger.log(
        JSON.stringify({
          requestId,
          method: request.method,
          path: request.originalUrl,
          statusCode: response.statusCode,
          durationMs: duration,
        }),
      );
    });

    next();
  }
}
