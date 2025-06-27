import { Command } from '@core/app/types';
import { AlbumId } from '@core/domain/components/album/types';

export class CreateAlbumCommand extends Command<AlbumId> {
  constructor(public readonly artistId: string) {
    super();
  }
}
