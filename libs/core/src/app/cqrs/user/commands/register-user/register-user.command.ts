import { Command } from '@core/app/types';
import { UserId } from '@core/domain/components/user/types';
import { RegisterUserPayload } from '@core/app/components/user/types';

export class RegisterUserCommand extends Command<UserId> {
  constructor(public readonly payload: RegisterUserPayload) {
    super();
  }
}
