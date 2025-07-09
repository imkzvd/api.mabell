import { CommandHandler } from '@core/app/types';
import { UserUpdateService } from '@core/app/components/user/services/user-update.service';
import { UpdateUserUsernameCommand } from '@core/app/cqrs/user/commands/update-user-username/update-user-username.command';

export class UpdateUserUsernameHandler implements CommandHandler<UpdateUserUsernameCommand> {
  constructor(private readonly _service: UserUpdateService) {}

  async execute({ id, username }: UpdateUserUsernameCommand) {
    return await this._service.updateUsername(id, username);
  }
}
