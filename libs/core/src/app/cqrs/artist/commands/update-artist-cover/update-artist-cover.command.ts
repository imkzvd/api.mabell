import { Command } from '@core/app/types';
import { ArtistId } from '@core/domain/components/artist/types';
import { UpdateArtistCoverPayload } from '@core/app/components/artist/types';

export class UpdateArtistCoverCommand extends Command<ArtistId> {
  constructor(
    public readonly id: string,
    public readonly payload: UpdateArtistCoverPayload,
  ) {
    super();
  }
}
