import { CommandHandler } from '@core/app/types';
import { UpdateUserPasswordCommand } from '@core/app/cqrs/user/commands/update-user-password/update-user-password.command';
import { UserUpdateService } from '@core/app/components/user/services/user-update.service';

export class UpdateUserPasswordHandler implements CommandHandler<UpdateUserPasswordCommand> {
  constructor(private readonly _service: UserUpdateService) {}

  async execute({ id, payload }: UpdateUserPasswordCommand) {
    return await this._service.updatePassword(id, payload);
  }
}
