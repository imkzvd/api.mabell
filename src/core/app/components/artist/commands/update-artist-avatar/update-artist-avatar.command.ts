import { Command } from '@nestjs/cqrs';
import { UpdateArtistAvatarPayload } from '../../types';
import { ArtistId } from '../../../../../domain/components/artist/types';

export class UpdateArtistAvatarCommand extends Command<ArtistId> {
  constructor(
    public readonly id: string,
    public readonly payload: UpdateArtistAvatarPayload,
  ) {
    super();
  }
}
