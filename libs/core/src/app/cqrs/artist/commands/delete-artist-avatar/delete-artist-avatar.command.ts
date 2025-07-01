import { Command } from '@core/app/types';
import { ArtistId } from '@core/domain/components/artist/types';

export class DeleteArtistAvatarCommand extends Command<ArtistId> {
  constructor(public readonly id: string) {
    super();
  }
}
