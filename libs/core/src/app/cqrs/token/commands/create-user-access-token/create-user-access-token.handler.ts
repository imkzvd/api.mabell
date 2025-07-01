import { CommandHandler } from '@core/app/types';
import { UnauthorizedException } from '@core/shared/exceptions';
import { UserService } from '@core/app/components/user/user.service';
import { UserTokenService } from '@core/app/components/user-token/user-token.service';
import { CreateUserAccessTokenCommand } from '@core/app/cqrs/token/commands/create-user-access-token/create-user-access-token.command';

export class CreateUserAccessTokenHandler implements CommandHandler<CreateUserAccessTokenCommand> {
  constructor(
    private readonly _userService: UserService,
    private readonly _userTokenService: UserTokenService,
  ) {}

  async execute({ userId }: CreateUserAccessTokenCommand) {
    const foundUser = await this._userService.getUser(userId);

    if (!foundUser) {
      throw new UnauthorizedException();
    }

    return this._userTokenService.createAccessToken({ userId: foundUser.id });
  }
}
