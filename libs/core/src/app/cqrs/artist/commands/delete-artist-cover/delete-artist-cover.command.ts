import { Command } from '@core/app/types';
import { ArtistId } from '@core/domain/components/artist/types';

export class DeleteArtistCoverCommand extends Command<ArtistId> {
  constructor(public readonly id: string) {
    super();
  }
}
