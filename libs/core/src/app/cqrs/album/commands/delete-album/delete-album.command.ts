import { Command } from '@core/app/types';
import { AlbumId } from '@core/domain/components/album/types';

export class DeleteAlbumCommand extends Command<AlbumId> {
  constructor(public readonly id: string) {
    super();
  }
}
