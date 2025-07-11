import { CommandHandler } from '@nestjs/cqrs';
import { UserUpdateService } from '@core/app/components/user/services/user-update.service';
import { DeleteUserAvatarHandler as CoreDeleteUserAvatarHandler } from '@core/app/cqrs/user/commands/delete-user-avatar/delete-user-avatar.handler';
import { DeleteUserAvatarCommand } from '@core/app/cqrs/user/commands/delete-user-avatar/delete-user-avatar.command';

@CommandHandler(DeleteUserAvatarCommand)
export class DeleteUserAvatarHandler extends CoreDeleteUserAvatarHandler {
  constructor(service: UserUpdateService) {
    super(service);
  }
}
