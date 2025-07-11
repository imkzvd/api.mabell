import { CommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from '@core/app/cqrs/user/commands/create-user/create-user.command';
import { CreateUserHandler as CoreCreateUserHandler } from '@core/app/cqrs/user/commands/create-user/create-user.handler';
import { UserCreateService } from '@core/app/components/user/services/user-create.service';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler extends CoreCreateUserHandler {
  constructor(service: UserCreateService) {
    super(service);
  }
}
