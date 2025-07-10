import { CommandHandler } from '@core/app/types';
import { UnauthorizedException } from '@core/shared/exceptions';
import { CreateUserRefreshTokenCommand } from '@core/app/cqrs/token/commands/create-user-refresh-token/create-user-refresh-token.command';
import { UserService } from '@core/app/components/user/services/user.service';
import { UserTokenCreateService } from '@core/app/components/user-token/services/user-token-create.service';

export class CreateUserRefreshTokenHandler
  implements CommandHandler<CreateUserRefreshTokenCommand>
{
  constructor(
    private readonly _userService: UserService,
    private readonly _userTokenCreateService: UserTokenCreateService,
  ) {}

  async execute({ payload }: CreateUserRefreshTokenCommand) {
    const foundUser = await this._userService.find(payload.userId);

    if (!foundUser) {
      throw new UnauthorizedException();
    }

    return this._userTokenCreateService.createRefreshToken({
      userId: foundUser.id,
      userAgent: payload.userAgent,
      ip: payload.ip,
    });
  }
}
