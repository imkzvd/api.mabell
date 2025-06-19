import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CreateUserAccessTokenCommand } from './create-user-access-token.command';
import { AdminTokenService } from '../../../../components/admin-token/admin-token.service';
import { UnauthorizedException } from '../../../../../shared/exceptions';
import { UserService } from '../../../../components/user/user.service';
import { UserTokenService } from '../../../../components/user-token/user-token.service';

@CommandHandler(CreateUserAccessTokenCommand)
export class CreateUserAccessTokenHandler implements ICommandHandler<CreateUserAccessTokenCommand> {
  constructor(
    @Inject(UserService) private readonly _userService: UserService,
    @Inject(AdminTokenService) private readonly _userTokenService: UserTokenService,
  ) {}

  async execute({ userId }: CreateUserAccessTokenCommand) {
    const foundUser = await this._userService.getUser(userId);

    if (!foundUser) {
      throw new UnauthorizedException();
    }

    return this._userTokenService.createAccessToken({ userId: foundUser.id });
  }
}
