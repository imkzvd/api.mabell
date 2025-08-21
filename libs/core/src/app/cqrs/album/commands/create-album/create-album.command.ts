import { Command } from '../../../../types';
import { AlbumId } from '../../../../../domain/components/album/types';

export class CreateAlbumCommand extends Command<{ id: AlbumId }> {
  constructor(public readonly artistId: string) {
    super();
  }
}
