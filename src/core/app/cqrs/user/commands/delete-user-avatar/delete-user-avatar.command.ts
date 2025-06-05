import { Command } from '@nestjs/cqrs';
import { UserId } from '../../../../../domain/components/user/types';

export class DeleteUserAvatarCommand extends Command<UserId> {
  constructor(public readonly id: string) {
    super();
  }
}
