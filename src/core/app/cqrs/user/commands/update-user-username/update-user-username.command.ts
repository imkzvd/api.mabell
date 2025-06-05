import { Command } from '@nestjs/cqrs';
import { UserId } from '../../../../../domain/components/user/types';

export class UpdateUserUsernameCommand extends Command<UserId> {
  constructor(
    public readonly id: string,
    public readonly username: string,
  ) {
    super();
  }
}
