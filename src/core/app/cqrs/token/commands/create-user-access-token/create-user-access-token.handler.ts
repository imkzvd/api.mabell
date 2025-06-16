import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CreateUserAccessTokenCommand } from './create-user-access-token.command';
import { TokenService } from '../../../../components/token/token.service';
import { UnauthorizedException } from '../../../../../shared/exceptions';
import { UserService } from '../../../../components/user/user.service';

@CommandHandler(CreateUserAccessTokenCommand)
export class CreateUserAccessTokenHandler implements ICommandHandler<CreateUserAccessTokenCommand> {
  constructor(
    @Inject(UserService) private readonly _userService: UserService,
    @Inject(TokenService) private readonly _tokenService: TokenService,
  ) {}

  async execute({ userId }: CreateUserAccessTokenCommand) {
    const foundUser = await this._userService.getUser(userId);

    if (!foundUser) {
      throw new UnauthorizedException();
    }

    return this._tokenService.createUserAccessToken({ userId: foundUser.id });
  }
}
