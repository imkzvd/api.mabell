import { CommandHandler } from '../../../../types';
import { DeleteUserCommand } from './delete-user.command';
import { UserDeleteService } from '../../../../components/user';

export class DeleteUserHandler implements CommandHandler<DeleteUserCommand> {
  constructor(private readonly _service: UserDeleteService) {}

  async execute({ id }: DeleteUserCommand) {
    await this._service.deleteById(id);
  }
}
