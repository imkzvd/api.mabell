import { Command } from '@nestjs/cqrs';
import { LoginPayload } from '../../../../components/login/types';
import { UserId } from '../../../../../domain/components/user/types';

export class LoginUserCommand extends Command<UserId> {
  constructor(public readonly payload: LoginPayload) {
    super();
  }
}
