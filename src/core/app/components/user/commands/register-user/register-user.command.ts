import { Command } from '@nestjs/cqrs';
import { RegisterUserPayload } from '../../types';

export class RegisterUserCommand extends Command<{ id: string }> {
  constructor(public readonly payload: RegisterUserPayload) {
    super();
  }
}
