import { Command } from '@core/app/types';
import { AlbumId } from '@core/domain/components/album/types';

export class UpdateAlbumArtistsCommand extends Command<AlbumId> {
  constructor(
    public readonly id: string,
    public readonly artistIds: string[],
  ) {
    super();
  }
}
