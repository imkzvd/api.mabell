import { CommandHandler } from '@core/app/types';
import { UserService } from '@core/app/components/user/user.service';
import { DeleteUserCommand } from '@core/app/cqrs/user/commands/delete-user/delete-user.command';

export class DeleteUserHandler implements CommandHandler<DeleteUserCommand> {
  constructor(private readonly _userService: UserService) {}

  async execute({ id }: DeleteUserCommand) {
    return await this._userService.deleteUser(id);
  }
}
