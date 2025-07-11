import { CommandHandler } from '@core/app/types';
import { UserUpdateService } from '@core/app/components/user/services/user-update.service';
import { RefreshUserPasswordCommand } from '@core/app/cqrs/user/commands/refresh-user-password/refresh-user-password.command';

export class RefreshUserPasswordHandler implements CommandHandler<RefreshUserPasswordCommand> {
  constructor(private readonly _service: UserUpdateService) {}

  async execute({ id }: RefreshUserPasswordCommand) {
    return await this._service.refreshPassword(id);
  }
}
