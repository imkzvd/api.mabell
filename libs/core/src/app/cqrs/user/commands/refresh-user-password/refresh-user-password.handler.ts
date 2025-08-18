import { CommandHandler } from '../../../../types';
import { RefreshUserPasswordCommand } from './refresh-user-password.command';
import { UserUpdateService } from '../../../../components/user';

export class RefreshUserPasswordHandler implements CommandHandler<RefreshUserPasswordCommand> {
  constructor(private readonly _service: UserUpdateService) {}

  execute({ id }: RefreshUserPasswordCommand) {
    return this._service.refreshPasswordById(id);
  }
}
