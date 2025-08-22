import { CommandHandler } from '../../../../types';
import { CreateUserAccessTokenCommand } from './create-user-access-token.command';
import { UserService } from '../../../../components/user';
import { UserTokenCreateService } from '../../../../components/user-token';
import { UnauthorizedException } from '../../../../../shared/exceptions';

export class CreateUserAccessTokenHandler implements CommandHandler<CreateUserAccessTokenCommand> {
  constructor(
    private readonly _userService: UserService,
    private readonly _userTokenCreateService: UserTokenCreateService,
  ) {}

  async execute({ userId }: CreateUserAccessTokenCommand) {
    const foundUser = await this._userService.findById(userId);

    if (!foundUser) {
      throw new UnauthorizedException();
    }

    const token = this._userTokenCreateService.createAccessToken({ userId: foundUser.id });

    return { token };
  }
}
