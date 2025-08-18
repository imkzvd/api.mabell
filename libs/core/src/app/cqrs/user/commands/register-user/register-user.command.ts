import { Command } from '../../../../types';
import { RegisterUserPayload } from '../../../../components/user/types';
import { UserId } from '../../../../../domain/components/user/types';

export class RegisterUserCommand extends Command<{ id: UserId }> {
  constructor(public readonly payload: RegisterUserPayload) {
    super();
  }
}
