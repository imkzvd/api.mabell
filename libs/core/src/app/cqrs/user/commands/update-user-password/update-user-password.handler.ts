import { CommandHandler } from '@core/app/types';
import { UserService } from '@core/app/components/user/user.service';
import { UpdateUserPasswordCommand } from '@core/app/cqrs/user/commands/update-user-password/update-user-password.command';

export class UpdateUserPasswordHandler implements CommandHandler<UpdateUserPasswordCommand> {
  constructor(private readonly _userService: UserService) {}

  async execute({ id, payload }: UpdateUserPasswordCommand) {
    return await this._userService.updateUserPassword(id, payload);
  }
}
