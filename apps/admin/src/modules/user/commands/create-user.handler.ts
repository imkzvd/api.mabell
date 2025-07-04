import { CommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CreateUserCommand } from '@core/app/cqrs/user/commands/create-user/create-user.command';
import { CreateUserHandler as CoreCreateUserHandler } from '@core/app/cqrs/user/commands/create-user/create-user.handler';
import { UserService } from '@core/app/components/user/user.service';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler extends CoreCreateUserHandler {
  constructor(@Inject(UserService) service: UserService) {
    super(service);
  }
}
