import { CommandHandler } from '@core/app/types';
import { UserService } from '@core/app/components/user/user.service';
import { UpdateUserEmailCommand } from '@core/app/cqrs/user/commands/update-user-email/update-user-email.command';

export class UpdateUserEmailHandler implements CommandHandler<UpdateUserEmailCommand> {
  constructor(private readonly _userService: UserService) {}

  async execute({ id, email }: UpdateUserEmailCommand) {
    return await this._userService.updateUserEmail(id, email);
  }
}
