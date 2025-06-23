import { Command } from '@nestjs/cqrs';
import { UserId } from '../../../../../domain/components/user/types';
import { RegisterUserPayload } from '../../../../components/user/types';

export class RegisterUserCommand extends Command<UserId> {
  constructor(public readonly payload: RegisterUserPayload) {
    super();
  }
}
