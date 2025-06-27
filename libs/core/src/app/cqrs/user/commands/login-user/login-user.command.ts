import { Command } from '@core/app/types';
import { LoginPayload } from '@core/app/components/login/types';
import { UserId } from '@core/domain/components/user/types';

export class LoginUserCommand extends Command<UserId> {
  constructor(public readonly payload: LoginPayload) {
    super();
  }
}
