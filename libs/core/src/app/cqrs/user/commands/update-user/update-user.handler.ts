import { CommandHandler } from '@core/app/types';
import { UserUpdateService } from '@core/app/components/user/services/user-update.service';
import { UpdateUserCommand } from '@core/app/cqrs/user/commands/update-user/update-user.command';

export class UpdateUserHandler implements CommandHandler<UpdateUserCommand> {
  constructor(private readonly _service: UserUpdateService) {}

  async execute({ id, payload }: UpdateUserCommand) {
    return await this._service.update(id, payload);
  }
}
