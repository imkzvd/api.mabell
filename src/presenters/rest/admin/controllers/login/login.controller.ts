import { Controller, Post, Body, HttpCode, HttpStatus, Res, Req } from '@nestjs/common';
import { ApiBody, ApiNoContentResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { CommandBus } from '@nestjs/cqrs';
import * as process from 'process';
import { LoginAdminCommand } from '../../../../../core/app/cqrs/admin/commands/login-admin/login-admin.command';
import { LoginAdminDTO } from './dtos/login-admin.dto';
import { CreateAdminAccessTokenCommand } from '../../../../../core/app/cqrs/token/commands/create-admin-access-token/create-admin-access-token.command';
import { CreateAdminRefreshTokenCommand } from '../../../../../core/app/cqrs/token/commands/create-admin-refresh-token/create-admin-refresh-token.command';
import { ACCESS_TOKEN_COOKIE_NAME, REFRESH_TOKEN_COOKIE_NAME } from '../../constants';
import { IsPublic } from '../../decorators/is-public.decorator';

@ApiTags('Login')
@IsPublic()
@Controller('/login')
export class LoginController {
  constructor(private readonly _commandBus: CommandBus) {}

  @ApiOperation({ summary: 'Admin login', operationId: 'login' })
  @ApiBody({ type: LoginAdminDTO })
  @ApiNoContentResponse({ description: 'Success login', schema: { format: 'json' } })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('/')
  async login(
    @Req() req: Request,
    @Body() dto: LoginAdminDTO,
    @Res({ passthrough: true }) res: Response,
  ): Promise<void> {
    const userAgent = req.headers['user-agent'] as string;
    const userIp = req.headers['x-real-ip'] as string;

    const loggedAdminId = await this._commandBus.execute(new LoginAdminCommand(dto));
    const accessToken = await this._commandBus.execute(
      new CreateAdminAccessTokenCommand(loggedAdminId),
    );
    const refreshToken = await this._commandBus.execute(
      new CreateAdminRefreshTokenCommand({
        adminId: loggedAdminId,
        userAgent,
        ip: userIp,
      }),
    );

    res.cookie(ACCESS_TOKEN_COOKIE_NAME, accessToken, {
      httpOnly: true,
      sameSite: true,
      maxAge:
        (process.env.ACCESS_TOKEN_EXPIRATION
          ? parseInt(process.env.ACCESS_TOKEN_EXPIRATION)
          : 300) * 1000,
    });

    res.cookie(REFRESH_TOKEN_COOKIE_NAME, refreshToken, {
      httpOnly: true,
      sameSite: true,
      maxAge:
        (process.env.REFRESH_TOKEN_EXPIRATION
          ? parseInt(process.env.REFRESH_TOKEN_EXPIRATION)
          : 600) * 1000,
    });
  }
}
