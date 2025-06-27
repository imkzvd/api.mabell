import { Command } from '@core/app/types';
import { UserId } from '@core/domain/components/user/types';

export class CreateUserCommand extends Command<UserId> {
  constructor() {
    super();
  }
}
