import { CommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CreateUserRefreshTokenCommand } from '@core/app/cqrs/token/commands/create-user-refresh-token/create-user-refresh-token.command';
import { CreateUserRefreshTokenHandler as CoreCreateUserRefreshTokenHandler } from '@core/app/cqrs/token/commands/create-user-refresh-token/create-user-refresh-token.handler';
import { UserService } from '@core/app/components/user/user.service';
import { UserTokenService } from '@core/app/components/user-token/user-token.service';

@CommandHandler(CreateUserRefreshTokenCommand)
export class CreateUserRefreshTokenHandler extends CoreCreateUserRefreshTokenHandler {
  constructor(
    @Inject(UserService) readonly userService: UserService,
    @Inject(UserTokenService) readonly userTokenService: UserTokenService,
  ) {
    super(userService, userTokenService);
  }
}
