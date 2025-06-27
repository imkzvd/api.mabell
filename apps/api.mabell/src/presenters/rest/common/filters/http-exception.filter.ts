import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import {
  BadRequestException,
  DuplicationException,
  ForbiddenException,
  NotFoundException,
  UnauthorizedException,
} from '@core/shared/exceptions';
import { ErrorRO } from '../ros/error.ro';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(error: Error | HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let statusCode = HttpStatus.BAD_REQUEST;

    if (error instanceof BadRequestException) {
      statusCode = HttpStatus.BAD_REQUEST;
    }

    if (error instanceof DuplicationException) {
      statusCode = HttpStatus.BAD_REQUEST;
    }

    if (error instanceof ForbiddenException) {
      statusCode = HttpStatus.FORBIDDEN;
    }

    if (error instanceof NotFoundException) {
      statusCode = HttpStatus.NOT_FOUND;
    }

    if (error instanceof UnauthorizedException) {
      statusCode = HttpStatus.UNAUTHORIZED;
    }

    response.status(statusCode).json(new ErrorRO(statusCode, error.message, request.url));
  }
}
