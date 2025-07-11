import { CommandHandler } from '@core/app/types';
import { UnauthorizedException } from '@core/shared/exceptions';
import { CreateUserAccessTokenCommand } from '@core/app/cqrs/token/commands/create-user-access-token/create-user-access-token.command';
import { UserService } from '@core/app/components/user/services/user.service';
import { UserTokenCreateService } from '@core/app/components/user-token/services/user-token-create.service';

export class CreateUserAccessTokenHandler implements CommandHandler<CreateUserAccessTokenCommand> {
  constructor(
    private readonly _userService: UserService,
    private readonly _userTokenCreateService: UserTokenCreateService,
  ) {}

  async execute({ userId }: CreateUserAccessTokenCommand) {
    const foundUser = await this._userService.find(userId);

    if (!foundUser) {
      throw new UnauthorizedException();
    }

    return this._userTokenCreateService.createAccessToken({ userId: foundUser.id });
  }
}
