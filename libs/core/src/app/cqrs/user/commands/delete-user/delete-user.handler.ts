import { CommandHandler } from '@core/app/types';
import { UserDeleteService } from '@core/app/components/user/services/user-delete.service';
import { DeleteUserCommand } from '@core/app/cqrs/user/commands/delete-user/delete-user.command';

export class DeleteUserHandler implements CommandHandler<DeleteUserCommand> {
  constructor(private readonly _service: UserDeleteService) {}

  async execute({ id }: DeleteUserCommand) {
    return await this._service.delete(id);
  }
}
