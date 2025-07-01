import { ApiProperty } from '@nestjs/swagger';
import { HttpExceptionBody } from '@nestjs/common/interfaces/http/http-exception-body.interface';

export class ErrorRO {
  @ApiProperty({ type: Number, example: 401 })
  statusCode: number;

  @ApiProperty({ type: String, example: 'Unauthorized' })
  message: string;

  @ApiProperty({ type: String, example: '/login' })
  path: string;

  @ApiProperty({ type: String, example: '2024-01-01T00:00:00Z' })
  timestamp: string;

  constructor(statusCode: number, message: string, path: string) {
    this.statusCode = statusCode;
    this.message = message;
    this.path = path;
    this.timestamp = new Date().toISOString();
  }
}

export class BadRequestErrorRO extends ErrorRO implements HttpExceptionBody {
  @ApiProperty({ example: 400 })
  declare statusCode: number;

  @ApiProperty({ example: "You've sent a bad request" })
  declare message: string;
}

export class UnauthorizedErrorRO extends ErrorRO implements HttpExceptionBody {
  @ApiProperty({ example: 401 })
  declare statusCode: number;

  @ApiProperty({ example: 'Authorization required' })
  declare message: string;
}

export class ForbiddenErrorRO extends Error implements HttpExceptionBody {
  @ApiProperty({ example: 403 })
  statusCode: number;

  @ApiProperty({ example: 'Your account does not have access' })
  message: string;
}

export class NotFoundErrorRO extends ErrorRO implements HttpExceptionBody {
  @ApiProperty({ example: 404 })
  declare statusCode: number;

  @ApiProperty({ example: 'Not found' })
  declare message: string;
}
