import { CommandHandler } from '@core/app/types';
import { UserService } from '@core/app/components/user/user.service';
import { RefreshUserPasswordCommand } from '@core/app/cqrs/user/commands/refresh-user-password/refresh-user-password.command';

export class RefreshUserPasswordHandler implements CommandHandler<RefreshUserPasswordCommand> {
  constructor(private readonly _userService: UserService) {}

  async execute({ id }: RefreshUserPasswordCommand) {
    return await this._userService.refreshUserPassword(id);
  }
}
