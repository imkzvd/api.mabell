import { CommandHandler } from '@nestjs/cqrs';
import { CreateUserAccessTokenCommand } from '@core/app/cqrs/token/commands/create-user-access-token/create-user-access-token.command';
import { CreateUserAccessTokenHandler as CoreCreateUserAccessTokenHandler } from '@core/app/cqrs/token/commands/create-user-access-token/create-user-access-token.handler';
import { UserService } from '@core/app/components/user/services/user.service';
import { UserTokenCreateService } from '@core/app/components/user-token/services/user-token-create.service';

@CommandHandler(CreateUserAccessTokenCommand)
export class CreateUserAccessTokenHandler extends CoreCreateUserAccessTokenHandler {
  constructor(userService: UserService, userTokenCreateService: UserTokenCreateService) {
    super(userService, userTokenCreateService);
  }
}
