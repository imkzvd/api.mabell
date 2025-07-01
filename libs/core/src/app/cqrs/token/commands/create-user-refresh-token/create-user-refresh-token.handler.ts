import { CommandHandler } from '@core/app/types';
import { UnauthorizedException } from '@core/shared/exceptions';
import { CreateUserRefreshTokenCommand } from '@core/app/cqrs/token/commands/create-user-refresh-token/create-user-refresh-token.command';
import { UserService } from '@core/app/components/user/user.service';
import { UserTokenService } from '@core/app/components/user-token/user-token.service';

export class CreateUserRefreshTokenHandler
  implements CommandHandler<CreateUserRefreshTokenCommand>
{
  constructor(
    private readonly _userService: UserService,
    private readonly _userTokenService: UserTokenService,
  ) {}

  async execute({ payload }: CreateUserRefreshTokenCommand) {
    const foundUser = await this._userService.getUser(payload.userId);

    if (!foundUser) {
      throw new UnauthorizedException();
    }

    return this._userTokenService.createRefreshToken({
      userId: foundUser.id,
      userAgent: payload.userAgent,
      ip: payload.ip,
    });
  }
}
