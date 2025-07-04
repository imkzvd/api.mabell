import { CommandHandler } from '@nestjs/cqrs';
import { DeleteUserCommand } from '@core/app/cqrs/user/commands/delete-user/delete-user.command';
import { DeleteUserHandler as CoreDeleteUserHandler } from '@core/app/cqrs/user/commands/delete-user/delete-user.handler';
import { UserService } from '@core/app/components/user/user.service';

@CommandHandler(DeleteUserCommand)
export class DeleteUserHandler extends CoreDeleteUserHandler {
  constructor(service: UserService) {
    super(service);
  }
}
