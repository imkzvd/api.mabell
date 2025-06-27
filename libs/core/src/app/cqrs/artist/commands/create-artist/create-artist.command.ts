import { Command } from '@core/app/types';
import { ArtistId } from '@core/domain/components/artist/types';

export class CreateArtistCommand extends Command<ArtistId> {
  constructor() {
    super();
  }
}
