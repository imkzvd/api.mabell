import { CommandHandler } from '@nestjs/cqrs';
import { UserUpdateService } from '@core/app/components/user/services/user-update.service';
import { UpdateUserCommand } from '@core/app/cqrs/user/commands/update-user/update-user.command';
import { UpdateUserHandler as CoreUpdateUserHandler } from '@core/app/cqrs/user/commands/update-user/update-user.handler';

@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler extends CoreUpdateUserHandler {
  constructor(service: UserUpdateService) {
    super(service);
  }
}
