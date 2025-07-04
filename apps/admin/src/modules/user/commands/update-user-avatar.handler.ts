import { CommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UserService } from '@core/app/components/user/user.service';
import { UpdateUserAvatarCommand } from '@core/app/cqrs/user/commands/update-user-avatar/update-user-avatar.command';
import { UpdateUserAvatarHandler as CoreUpdateUserAvatarHandler } from '@core/app/cqrs/user/commands/update-user-avatar/update-user-avatar.handler';

@CommandHandler(UpdateUserAvatarCommand)
export class UpdateUserAvatarHandler extends CoreUpdateUserAvatarHandler {
  constructor(@Inject(UserService) service: UserService) {
    super(service);
  }
}
