import { CommandHandler } from '@core/app/types';
import { UserService } from '@core/app/components/user/user.service';
import { UpdateUserUsernameCommand } from '@core/app/cqrs/user/commands/update-user-username/update-user-username.command';

export class UpdateUserUsernameHandler implements CommandHandler<UpdateUserUsernameCommand> {
  constructor(private readonly _userService: UserService) {}

  async execute({ id, username }: UpdateUserUsernameCommand) {
    return await this._userService.updateUserUsername(id, username);
  }
}
