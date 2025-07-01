import { Command } from '@core/app/types';
import { UserId } from '@core/domain/components/user/types';

export class UpdateUserUsernameCommand extends Command<UserId> {
  constructor(
    public readonly id: string,
    public readonly username: string,
  ) {
    super();
  }
}
