import { Command } from '@nestjs/cqrs';
import { UserId } from '../../../../../domain/components/user/types';

export class UpdateUserEmailCommand extends Command<UserId> {
  constructor(
    public readonly id: string,
    public readonly email: string,
  ) {
    super();
  }
}
