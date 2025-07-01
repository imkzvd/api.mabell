import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CreateUserRefreshTokenCommand } from '@core/app/cqrs/token/commands/create-user-refresh-token/create-user-refresh-token.command';
import { CreateUserRefreshTokenHandler as CoreCreateUserRefreshTokenHandler } from '@core/app/cqrs/token/commands/create-user-refresh-token/create-user-refresh-token.handler';
import { UserService } from '@core/app/components/user/user.service';
import { UserTokenService } from '@core/app/components/user-token/user-token.service';

@CommandHandler(CreateUserRefreshTokenCommand)
export class CreateUserRefreshTokenHandler
  implements ICommandHandler<CreateUserRefreshTokenCommand>
{
  private readonly _coreHandler: CoreCreateUserRefreshTokenHandler;

  constructor(
    @Inject(UserService) readonly userService: UserService,
    @Inject(UserTokenService) readonly userTokenService: UserTokenService,
  ) {
    this._coreHandler = new CoreCreateUserRefreshTokenHandler(userService, userTokenService);
  }

  execute(command: CreateUserRefreshTokenCommand) {
    return this._coreHandler.execute(command);
  }
}
