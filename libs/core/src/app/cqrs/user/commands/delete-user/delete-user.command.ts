import { Command } from '@core/app/types';
import { UserId } from '@core/domain/components/user/types';

export class DeleteUserCommand extends Command<UserId> {
  constructor(public readonly id: string) {
    super();
  }
}
