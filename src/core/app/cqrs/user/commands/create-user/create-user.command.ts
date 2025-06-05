import { Command } from '@nestjs/cqrs';
import { UserId } from '../../../../../domain/components/user/types';

export class CreateUserCommand extends Command<UserId> {
  constructor() {
    super();
  }
}
