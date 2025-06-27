import { CommandHandler } from '@core/app/types';
import { UserService } from '@core/app/components/user/user.service';
import { DeleteUserAvatarCommand } from '@core/app/cqrs/user/commands/delete-user-avatar/delete-user-avatar.command';

export class DeleteUserAvatarHandler implements CommandHandler<DeleteUserAvatarCommand> {
  constructor(private readonly _userService: UserService) {}

  async execute({ id }: DeleteUserAvatarCommand) {
    return await this._userService.deleteUserAvatar(id);
  }
}
