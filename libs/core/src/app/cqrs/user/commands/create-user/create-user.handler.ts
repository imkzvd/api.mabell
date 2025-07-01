import { CommandHandler } from '@core/app/types';
import { UserService } from '@core/app/components/user/user.service';
import { CreateUserCommand } from '@core/app/cqrs/user/commands/create-user/create-user.command';

export class CreateUserHandler implements CommandHandler<CreateUserCommand> {
  constructor(private readonly _userService: UserService) {}

  async execute() {
    return await this._userService.createUser();
  }
}
