import { Controller, Post, Body, Res, Req, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiBody, ApiNoContentResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import * as process from 'process';
import { CommandBus } from '@nestjs/cqrs';
import { LoginUserDTO } from './dtos/login-user.dto';
import { LoginUserCommand } from '../../../../../core/app/cqrs/user/commands/login-user/login-user.command';
import { CreateUserAccessTokenCommand } from '../../../../../core/app/cqrs/token/commands/create-user-access-token/create-user-access-token.command';

@ApiTags('Login')
@Controller('/login')
export class LoginController {
  constructor(private readonly _commandBus: CommandBus) {}

  @ApiOperation({ summary: 'User login', operationId: 'login' })
  @ApiBody({ type: LoginUserDTO })
  @ApiNoContentResponse({ description: 'Success login', schema: { format: 'json' } })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('/')
  async login(
    @Req() req: Request,
    @Body() dto: LoginUserDTO,
    @Res({ passthrough: true }) res: Response,
  ): Promise<void> {
    const loggedUserId = await this._commandBus.execute(new LoginUserCommand(dto));
    const accessToken = await this._commandBus.execute(
      new CreateUserAccessTokenCommand(loggedUserId),
    );

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      sameSite: true,
      maxAge:
        (process.env.ACCESS_TOKEN_EXPIRATION
          ? parseInt(process.env.ACCESS_TOKEN_EXPIRATION)
          : 300) * 1000,
    });
  }
}
