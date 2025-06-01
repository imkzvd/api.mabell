import { Command } from '@nestjs/cqrs';
import { UserId } from '../../../../../domain/components/user/types';
import { UpdateUserAvatarPayload } from '../../../../components/user/types';

export class UpdateUserAvatarCommand extends Command<UserId> {
  constructor(
    public readonly id: string,
    public readonly payload: UpdateUserAvatarPayload,
  ) {
    super();
  }
}
