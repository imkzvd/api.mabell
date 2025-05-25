import { Command } from '@nestjs/cqrs';
import { UpdateUserAvatarPayload } from '../../types';

export class UpdateUserAvatarCommand extends Command<void> {
  constructor(
    public readonly id: string,
    public readonly payload: UpdateUserAvatarPayload,
  ) {
    super();
  }
}
