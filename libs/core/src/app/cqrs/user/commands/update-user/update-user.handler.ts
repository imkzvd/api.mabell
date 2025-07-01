import { CommandHandler } from '@core/app/types';
import { UserService } from '@core/app/components/user/user.service';
import { UpdateUserCommand } from '@core/app/cqrs/user/commands/update-user/update-user.command';

export class UpdateUserHandler implements CommandHandler<UpdateUserCommand> {
  constructor(private readonly _userService: UserService) {}

  async execute({ id, payload }: UpdateUserCommand) {
    return await this._userService.updateUser(id, payload);
  }
}
