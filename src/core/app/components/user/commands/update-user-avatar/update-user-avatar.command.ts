import { Command } from '@nestjs/cqrs';
import { UpdateUserAvatarPayload } from '../../types';
import { UserId } from '../../../../../domain/components/user/types';

export class UpdateUserAvatarCommand extends Command<UserId> {
  constructor(
    public readonly id: string,
    public readonly payload: UpdateUserAvatarPayload,
  ) {
    super();
  }
}
