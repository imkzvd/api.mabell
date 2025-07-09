import { CommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CreateUserCommand } from '@core/app/cqrs/user/commands/create-user/create-user.command';
import { CreateUserHandler as CoreCreateUserHandler } from '@core/app/cqrs/user/commands/create-user/create-user.handler';
import { UserCreateService } from '@core/app/components/user/services/user-create.service';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler extends CoreCreateUserHandler {
  constructor(@Inject(UserCreateService) service: UserCreateService) {
    super(service);
  }
}
