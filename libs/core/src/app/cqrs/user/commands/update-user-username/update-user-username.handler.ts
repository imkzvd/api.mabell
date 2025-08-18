import { CommandHandler } from '../../../../types';
import { UpdateUserUsernameCommand } from './update-user-username.command';
import { UserUpdateService } from '../../../../components/user';

export class UpdateUserUsernameHandler implements CommandHandler<UpdateUserUsernameCommand> {
  constructor(private readonly _service: UserUpdateService) {}

  async execute({ id, username }: UpdateUserUsernameCommand) {
    await this._service.updateUsernameById(id, username);
  }
}
