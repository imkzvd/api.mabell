import { CommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UserUpdateService } from '@core/app/components/user/services/user-update.service';
import { UpdateUserAvatarCommand } from '@core/app/cqrs/user/commands/update-user-avatar/update-user-avatar.command';
import { UpdateUserAvatarHandler as CoreUpdateUserAvatarHandler } from '@core/app/cqrs/user/commands/update-user-avatar/update-user-avatar.handler';

@CommandHandler(UpdateUserAvatarCommand)
export class UpdateUserAvatarHandler extends CoreUpdateUserAvatarHandler {
  constructor(@Inject(UserUpdateService) service: UserUpdateService) {
    super(service);
  }
}
