import { Command } from '@core/app/types';
import { ArtistId } from '@core/domain/components/artist/types';
import { UpdateArtistAvatarPayload } from '@core/app/components/artist/types';

export class UpdateArtistAvatarCommand extends Command<ArtistId> {
  constructor(
    public readonly id: string,
    public readonly payload: UpdateArtistAvatarPayload,
  ) {
    super();
  }
}
