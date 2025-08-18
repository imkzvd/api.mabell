import { CommandHandler } from '../../../../types';
import { DeleteUserAvatarCommand } from './delete-user-avatar.command';
import { UserUpdateService } from '../../../../components/user';

export class DeleteUserAvatarHandler implements CommandHandler<DeleteUserAvatarCommand> {
  constructor(private readonly _service: UserUpdateService) {}

  async execute({ id }: DeleteUserAvatarCommand) {
    await this._service.deleteAvatarById(id);
  }
}
