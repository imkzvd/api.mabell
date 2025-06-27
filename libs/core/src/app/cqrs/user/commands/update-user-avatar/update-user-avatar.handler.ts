import { CommandHandler } from '@core/app/types';
import { UserService } from '@core/app/components/user/user.service';
import { UpdateUserAvatarCommand } from '@core/app/cqrs/user/commands/update-user-avatar/update-user-avatar.command';

export class UpdateUserAvatarHandler implements CommandHandler<UpdateUserAvatarCommand> {
  constructor(private readonly _userService: UserService) {}

  async execute({ id, payload }: UpdateUserAvatarCommand) {
    return await this._userService.updateUserAvatar(id, payload);
  }
}
