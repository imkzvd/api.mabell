import { CommandHandler } from '../../../../types';
import { UpdateUserAvatarCommand } from './update-user-avatar.command';
import { UserUpdateService } from '../../../../components/user';

export class UpdateUserAvatarHandler implements CommandHandler<UpdateUserAvatarCommand> {
  constructor(private readonly _service: UserUpdateService) {}

  async execute({ id, payload }: UpdateUserAvatarCommand) {
    await this._service.updateAvatarById(id, payload);
  }
}
