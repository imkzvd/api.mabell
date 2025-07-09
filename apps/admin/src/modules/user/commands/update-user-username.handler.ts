import { CommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UserUpdateService } from '@core/app/components/user/services/user-update.service';
import { UpdateUserUsernameCommand } from '@core/app/cqrs/user/commands/update-user-username/update-user-username.command';
import { UpdateUserUsernameHandler as CoreUpdateUserUsernameHandler } from '@core/app/cqrs/user/commands/update-user-username/update-user-username.handler';

@CommandHandler(UpdateUserUsernameCommand)
export class UpdateUserUsernameHandler extends CoreUpdateUserUsernameHandler {
  constructor(@Inject(UserUpdateService) service: UserUpdateService) {
    super(service);
  }
}
