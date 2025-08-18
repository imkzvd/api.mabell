import { CommandHandler } from '../../../../types';
import { CreateUserRefreshTokenCommand } from './create-user-refresh-token.command';
import { UserService } from '../../../../components/user';
import { UserTokenCreateService } from '../../../../components/user-token';
import { UnauthorizedException } from '../../../../../shared/exceptions';

export class CreateUserRefreshTokenHandler
  implements CommandHandler<CreateUserRefreshTokenCommand>
{
  constructor(
    private readonly _userService: UserService,
    private readonly _userTokenCreateService: UserTokenCreateService,
  ) {}

  async execute({ payload }: CreateUserRefreshTokenCommand) {
    const foundUser = await this._userService.findById(payload.userId);

    if (!foundUser) {
      throw new UnauthorizedException();
    }

    const token = await this._userTokenCreateService.createRefreshToken({
      userId: foundUser.id,
      userAgent: payload.userAgent,
      ip: payload.ip,
    });

    return { token };
  }
}
