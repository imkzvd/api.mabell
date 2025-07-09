import { Inject } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';
import { DeleteUserCommand } from '@core/app/cqrs/user/commands/delete-user/delete-user.command';
import { DeleteUserHandler as CoreDeleteUserHandler } from '@core/app/cqrs/user/commands/delete-user/delete-user.handler';
import { UserDeleteService } from '@core/app/components/user/services/user-delete.service';

@CommandHandler(DeleteUserCommand)
export class DeleteUserHandler extends CoreDeleteUserHandler {
  constructor(@Inject(UserDeleteService) service: UserDeleteService) {
    super(service);
  }
}
