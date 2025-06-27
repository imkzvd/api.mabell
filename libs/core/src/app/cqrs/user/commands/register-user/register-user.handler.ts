import { CommandHandler } from '@core/app/types';
import { UserService } from '@core/app/components/user/user.service';
import { RegisterUserCommand } from '@core/app/cqrs/user/commands/register-user/register-user.command';

export class RegisterUserHandler implements CommandHandler<RegisterUserCommand> {
  constructor(private readonly _userService: UserService) {}

  async execute({ payload }: RegisterUserCommand) {
    return await this._userService.registerUser(payload);
  }
}
