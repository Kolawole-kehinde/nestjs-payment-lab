import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { RequestWithId } from '../middleware/request-logging.middleware.js';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse();
    const request = context.getRequest<RequestWithId>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const exceptionResponse =
      exception instanceof HttpException ? exception.getResponse() : null;

    const message =
      typeof exceptionResponse === 'string'
        ? exceptionResponse
        : exceptionResponse &&
            typeof exceptionResponse === 'object' &&
            'message' in exceptionResponse
          ? exceptionResponse.message
          : status === HttpStatus.INTERNAL_SERVER_ERROR
            ? 'Internal server error'
            : exception instanceof Error
              ? exception.message
              : 'Request failed';

    if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
      this.logger.error(
        JSON.stringify({
          requestId: request.requestId,
          method: request.method,
          path: request.url,
          statusCode: status,
          message: 'Unexpected server error',
        }),
        exception instanceof Error ? exception.stack : undefined,
      );
    }
    response.status(status).json({
      statusCode: status,
      message,
      path: request.url,
      timestamp: new Date().toISOString(),
    });
  }
}

// What this does
//- @Catch(HttpException) tells NestJS which exceptions this filter handles.
//- ArgumentsHost provides access to the HTTP request and response.
//- exception.getStatus() retrieves the HTTP status code.
//- exception.getResponse() retrieves the exception's response message.
//- The response includes a timestamp and request path for easier debugging.
//- Logger — imported from @nestjs/common to log errors on the server.
//- private readonly logger — creates a logger identified as HttpExceptionFilter.
//- this.logger.error() — logs the request method, URL, and stack trace when an unexpected server error occurs.
//- Client safety — the response still returns Internal server error, not the internal exception details.
// @Catch() catches all exceptions, not just HttpException. @Catch(HttpException) would catch only that specific exception type.
