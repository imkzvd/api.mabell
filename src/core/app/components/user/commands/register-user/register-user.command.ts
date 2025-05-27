import { Command } from '@nestjs/cqrs';
import { RegisterUserPayload } from '../../types';
import { UserId } from '../../../../../domain/components/user/types';

export class RegisterUserCommand extends Command<UserId> {
  constructor(public readonly payload: RegisterUserPayload) {
    super();
  }
}
