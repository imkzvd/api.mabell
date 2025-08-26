import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Res,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiBody, ApiNoContentResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
import { App } from '@api.mabell/core';
import { CommandBus } from '@api.mabell/cqrs';
import { QueryBus } from '@api.mabell/cqrs';
import { IsPublic } from '@api.mabell/shared';
import { LoginAdminDTO } from './dtos/login-admin.dto';
import { ACCESS_TOKEN_COOKIE_NAME, REFRESH_TOKEN_COOKIE_NAME } from '../../constants';

@ApiTags('Auth')
@IsPublic()
@Controller('/auth')
export class AuthController {
  constructor(
    private readonly _CB: CommandBus,
    private readonly _QB: QueryBus,
    private readonly _configService: ConfigService,
  ) {}

  @ApiOperation({ summary: 'Admin login', operationId: 'login' })
  @ApiBody({ type: LoginAdminDTO })
  @ApiNoContentResponse({ description: 'Success login', schema: { format: 'json' } })
  @HttpCode(HttpStatus.NO_CONTENT)
  @IsPublic()
  @Post('/login')
  async login(
    @Req() req: Request,
    @Body() dto: LoginAdminDTO,
    @Res({ passthrough: true }) res: Response,
  ): Promise<void> {
    const userAgent = req.headers['user-agent'] as string;
    const userIp = req.headers['x-real-ip'] as string;

    const { id: loggedAdminId } = await this._CB.execute(new App.CQRS.LoginAdminCommand(dto));
    const accessToken = await this._CB.execute(
      new App.CQRS.CreateAdminAccessTokenCommand(loggedAdminId),
    );
    const refreshToken = await this._CB.execute(
      new App.CQRS.CreateAdminRefreshTokenCommand({
        adminId: loggedAdminId,
        userAgent,
        ip: userIp,
      }),
    );

    const accessTokenExpiresIn = this._configService.get<number>('jwt.accessToken.expiresIn');
    const refreshTokenExpiresIn = this._configService.get<number>('jwt.refreshToken.expiresIn');

    res.cookie(ACCESS_TOKEN_COOKIE_NAME, accessToken, {
      httpOnly: true,
      maxAge: (accessTokenExpiresIn ? accessTokenExpiresIn : 300) * 1000,
    });

    res.cookie(REFRESH_TOKEN_COOKIE_NAME, refreshToken, {
      httpOnly: true,
      maxAge: (refreshTokenExpiresIn ? refreshTokenExpiresIn : 600) * 1000,
    });
  }

  @ApiOperation({ summary: 'Admin logout', operationId: 'logout' })
  @ApiNoContentResponse({ description: 'Success logout', schema: { format: 'json' } })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('/logout')
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const refreshToken = req.cookies[REFRESH_TOKEN_COOKIE_NAME] as string | undefined;

    if (refreshToken) {
      await this._CB.execute(new App.CQRS.DeleteAdminRefreshTokenCommand(refreshToken));
    }

    res.clearCookie(ACCESS_TOKEN_COOKIE_NAME);
    res.clearCookie(REFRESH_TOKEN_COOKIE_NAME);
  }

  @ApiOperation({ summary: 'Refresh access token', operationId: 'refreshAccessToken' })
  @ApiNoContentResponse({ description: 'Success refresh', schema: { format: 'json' } })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('/refresh')
  async refreshAccessToken(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<void> {
    const refreshToken = req.cookies[REFRESH_TOKEN_COOKIE_NAME] as string | undefined;

    if (!refreshToken) {
      throw new UnauthorizedException();
    }

    const userIp = req.headers['x-real-ip'] as string;
    const userAgent = req.headers['user-agent'] as string;

    const validatedRefreshToken = await this._QB.execute(
      new App.CQRS.ValidateAdminRefreshTokenQuery({
        token: refreshToken,
        ip: userIp,
        userAgent,
      }),
    );

    if (validatedRefreshToken) {
      const accessToken = await this._CB.execute(
        new App.CQRS.CreateAdminAccessTokenCommand(validatedRefreshToken.owner),
      );

      const accessTokenExpiresIn = this._configService.get<number>('jwt.accessToken.expiresIn');

      res.cookie(ACCESS_TOKEN_COOKIE_NAME, accessToken, {
        httpOnly: true,
        maxAge: (accessTokenExpiresIn ? accessTokenExpiresIn : 300) * 1000,
      });
    } else {
      res.clearCookie(ACCESS_TOKEN_COOKIE_NAME);
      res.clearCookie(REFRESH_TOKEN_COOKIE_NAME);

      throw new UnauthorizedException();
    }
  }
}
