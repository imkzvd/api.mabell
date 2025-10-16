import { Controller, Post, Body, Res, Req, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiBody, ApiNoContentResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { App } from '@api.mabell/core';
import { CommandBus } from '@api.mabell/cqrs';
import { IsPublic } from '@api.mabell/shared';
import { ConfigService } from '@nestjs/config';
import { ACCESS_TOKEN_COOKIE_NAME, REFRESH_TOKEN_COOKIE_NAME } from '../../constants';
import { LoginUserDTO } from './dtos/login-user.dto';

@ApiTags('Auth')
@Controller('/auth')
export class AuthController {
  constructor(
    private readonly _CB: CommandBus,
    private readonly _configService: ConfigService,
  ) {}

  @ApiOperation({ summary: 'User login', operationId: 'login' })
  @ApiBody({ type: LoginUserDTO })
  @ApiNoContentResponse({ description: 'Success login', schema: { format: 'json' } })
  @HttpCode(HttpStatus.NO_CONTENT)
  @IsPublic()
  @Post('/login')
  async login(
    @Req() req: Request,
    @Body() dto: LoginUserDTO,
    @Res({ passthrough: true }) res: Response,
  ): Promise<void> {
    const userAgent = req.headers['user-agent'] as string;
    const userIp = (req.headers['x-real-ip'] || req.ip) as string;

    const { id: loggedUserId } = await this._CB.execute(new App.CQRS.LoginUserCommand(dto));
    const { token: accessToken } = await this._CB.execute(
      new App.CQRS.CreateUserAccessTokenCommand(loggedUserId),
    );
    const { token: refreshToken } = await this._CB.execute(
      new App.CQRS.CreateUserRefreshTokenCommand({
        userId: loggedUserId,
        userAgent,
        ip: userIp,
      }),
    );

    const accessTokenExpiresIn = this._configService.get<number>('jwt.accessToken.expiresIn');
    const refreshTokenExpiresIn = this._configService.get<number>('jwt.refreshToken.expiresIn');

    res.cookie(ACCESS_TOKEN_COOKIE_NAME, accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      maxAge: (accessTokenExpiresIn ? accessTokenExpiresIn : 300) * 1000,
    });

    res.cookie(REFRESH_TOKEN_COOKIE_NAME, refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      maxAge: (refreshTokenExpiresIn ? refreshTokenExpiresIn : 600) * 1000,
    });
  }
}
