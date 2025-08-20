import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { Shared } from '@api.mabell/core';
import { ErrorRO } from '../ros';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(error: Error | HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let statusCode = HttpStatus.BAD_REQUEST;
    let errorMessage: string | string[] = 'Bad Request.';

    if (error instanceof HttpException) {
      statusCode = error.getStatus();
      // @ts-expect-error fix error response
      errorMessage = error.getResponse().message as string | string[];
    }

    if (error instanceof Shared.Exceptions.BadRequestException) {
      statusCode = HttpStatus.BAD_REQUEST;
      errorMessage = error.message;
    }

    if (error instanceof Shared.Exceptions.DuplicationException) {
      statusCode = HttpStatus.BAD_REQUEST;
      errorMessage = error.message;
    }

    if (error instanceof Shared.Exceptions.ForbiddenException) {
      statusCode = HttpStatus.FORBIDDEN;
      errorMessage = error.message;
    }

    if (error instanceof Shared.Exceptions.NotFoundException) {
      statusCode = HttpStatus.NOT_FOUND;
      errorMessage = error.message;
    }

    if (error instanceof Shared.Exceptions.UnauthorizedException) {
      statusCode = HttpStatus.UNAUTHORIZED;
      errorMessage = error.message;
    }

    response.status(statusCode).json(new ErrorRO(statusCode, errorMessage, request.url));
  }
}
