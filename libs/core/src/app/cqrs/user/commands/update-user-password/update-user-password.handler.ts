import { CommandHandler } from '../../../../types';
import { UpdateUserPasswordCommand } from './update-user-password.command';
import { UserUpdateService } from '../../../../components/user';

export class UpdateUserPasswordHandler implements CommandHandler<UpdateUserPasswordCommand> {
  constructor(private readonly _service: UserUpdateService) {}

  async execute({ id, payload }: UpdateUserPasswordCommand) {
    await this._service.updatePasswordById(id, payload);
  }
}
