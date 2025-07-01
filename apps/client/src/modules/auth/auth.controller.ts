import { Controller, Post, Body, Res, Req, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiBody, ApiNoContentResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { IsPublic } from '@shared/decorators/is-public.decorator';
import { CommandBus } from '@infrastructure/command-bus';
import { ConfigService } from '@nestjs/config';
import { LoginUserCommand } from '@core/app/cqrs/user/commands/login-user/login-user.command';
import { CreateUserAccessTokenCommand } from '@core/app/cqrs/token/commands/create-user-access-token/create-user-access-token.command';
import { CreateUserRefreshTokenCommand } from '@core/app/cqrs/token/commands/create-user-refresh-token/create-user-refresh-token.command';
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
    const userIp = req.headers['x-real-ip'] as string;

    const loggedUserId = await this._CB.execute(new LoginUserCommand(dto));
    const accessToken = await this._CB.execute(new CreateUserAccessTokenCommand(loggedUserId));
    const refreshToken = await this._CB.execute(
      new CreateUserRefreshTokenCommand({
        userId: loggedUserId,
        userAgent,
        ip: userIp,
      }),
    );

    const accessTokenExpiresIn = this._configService.get<number>('jwt.accessToken.expiresIn');
    const refreshTokenExpiresIn = this._configService.get<number>('jwt.refreshToken.expiresIn');

    res.cookie(ACCESS_TOKEN_COOKIE_NAME, accessToken, {
      httpOnly: true,
      sameSite: true,
      maxAge: (accessTokenExpiresIn ? accessTokenExpiresIn : 300) * 1000,
    });

    res.cookie(REFRESH_TOKEN_COOKIE_NAME, refreshToken, {
      httpOnly: true,
      sameSite: true,
      maxAge: (refreshTokenExpiresIn ? refreshTokenExpiresIn : 600) * 1000,
    });
  }
}
