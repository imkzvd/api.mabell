import { Command } from '@nestjs/cqrs';
import { UpdateArtistAvatarPayload } from '../../types';

export class UpdateArtistAvatarCommand extends Command<void> {
  constructor(
    public readonly id: string,
    public readonly payload: UpdateArtistAvatarPayload,
  ) {
    super();
  }
}
