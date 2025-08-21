import { CommandHandler } from '../../../../types';
import { UpdateUserCommand } from './update-user.command';
import { UserUpdateService } from '../../../../components/user';

export class UpdateUserHandler implements CommandHandler<UpdateUserCommand> {
  constructor(private readonly _service: UserUpdateService) {}

  async execute({ id, payload }: UpdateUserCommand) {
    await this._service.updateById(id, payload);
  }
}
