import { CommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UserService } from '@core/app/components/user/user.service';
import { UserTokenService } from '@core/app/components/user-token/user-token.service';
import { CreateUserAccessTokenCommand } from '@core/app/cqrs/token/commands/create-user-access-token/create-user-access-token.command';
import { CreateUserAccessTokenHandler as CoreCreateUserAccessTokenHandler } from '@core/app/cqrs/token/commands/create-user-access-token/create-user-access-token.handler';

@CommandHandler(CreateUserAccessTokenCommand)
export class CreateUserAccessTokenHandler extends CoreCreateUserAccessTokenHandler {
  constructor(
    @Inject(UserService) userService: UserService,
    @Inject(UserTokenService) userTokenService: UserTokenService,
  ) {
    super(userService, userTokenService);
  }
}
