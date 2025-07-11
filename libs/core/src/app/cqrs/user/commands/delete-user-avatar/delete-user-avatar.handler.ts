import { CommandHandler } from '@core/app/types';
import { UserUpdateService } from '@core/app/components/user/services/user-update.service';
import { DeleteUserAvatarCommand } from '@core/app/cqrs/user/commands/delete-user-avatar/delete-user-avatar.command';

export class DeleteUserAvatarHandler implements CommandHandler<DeleteUserAvatarCommand> {
  constructor(private readonly _service: UserUpdateService) {}

  async execute({ id }: DeleteUserAvatarCommand) {
    return await this._service.deleteAvatar(id);
  }
}
