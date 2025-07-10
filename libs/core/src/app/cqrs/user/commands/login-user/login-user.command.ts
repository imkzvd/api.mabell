import { Command } from '@core/app/types';
import { UserId } from '@core/domain/components/user/types';
import { LoginUserPayload } from '@core/app/components/user/types';

export class LoginUserCommand extends Command<UserId> {
  constructor(public readonly payload: LoginUserPayload) {
    super();
  }
}
