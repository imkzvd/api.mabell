import { CommandHandler } from '@nestjs/cqrs';
import { CreateUserRefreshTokenCommand } from '@core/app/cqrs/token/commands/create-user-refresh-token/create-user-refresh-token.command';
import { CreateUserRefreshTokenHandler as CoreCreateUserRefreshTokenHandler } from '@core/app/cqrs/token/commands/create-user-refresh-token/create-user-refresh-token.handler';
import { UserService } from '@core/app/components/user/services/user.service';
import { UserTokenCreateService } from '@core/app/components/user-token/services/user-token-create.service';

@CommandHandler(CreateUserRefreshTokenCommand)
export class CreateUserRefreshTokenHandler extends CoreCreateUserRefreshTokenHandler {
  constructor(userService: UserService, userTokenCreateService: UserTokenCreateService) {
    super(userService, userTokenCreateService);
  }
}
