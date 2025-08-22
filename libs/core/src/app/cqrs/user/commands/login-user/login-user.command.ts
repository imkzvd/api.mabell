import { Command } from '../../../../types';
import { LoginUserPayload } from '../../../../components/user/types';
import { UserId } from '../../../../../domain/components/user/types';

export class LoginUserCommand extends Command<{ id: UserId }> {
  constructor(public readonly payload: LoginUserPayload) {
    super();
  }
}
