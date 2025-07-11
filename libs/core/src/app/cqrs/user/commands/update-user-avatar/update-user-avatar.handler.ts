import { CommandHandler } from '@core/app/types';
import { UserUpdateService } from '@core/app/components/user/services/user-update.service';
import { UpdateUserAvatarCommand } from '@core/app/cqrs/user/commands/update-user-avatar/update-user-avatar.command';

export class UpdateUserAvatarHandler implements CommandHandler<UpdateUserAvatarCommand> {
  constructor(private readonly _service: UserUpdateService) {}

  async execute({ id, payload }: UpdateUserAvatarCommand) {
    return await this._service.updateAvatar(id, payload);
  }
}
