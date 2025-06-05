import { Command } from '@nestjs/cqrs';
import { AlbumId } from '../../../../../domain/components/album/types';

export class UpdateAlbumArtistsCommand extends Command<AlbumId> {
  constructor(
    public readonly id: string,
    public readonly artists: string[],
  ) {
    super();
  }
}
