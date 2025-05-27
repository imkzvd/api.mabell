import { Command } from '@nestjs/cqrs';
import { UserId } from '../../../../../domain/components/user/types';

export class DeleteUserCommand extends Command<UserId> {
  constructor(public readonly id: string) {
    super();
  }
}
