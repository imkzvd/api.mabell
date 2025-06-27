import { Command } from '@core/app/types';
import { ArtistId } from '@core/domain/components/artist/types';
import { UpdateArtistPayload } from '@core/app/components/artist/types';

export class UpdateArtistCommand extends Command<ArtistId> {
  constructor(
    public readonly id: string,
    public readonly payload: UpdateArtistPayload,
  ) {
    super();
  }
}
