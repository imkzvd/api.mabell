import { Command } from '@core/app/types';
import { AlbumId } from '@core/domain/components/album/types';
import { UpdateAlbumPayload } from '@core/app/components/album/types';

export class UpdateAlbumCommand extends Command<AlbumId> {
  constructor(
    public readonly id: string,
    public readonly payload: UpdateAlbumPayload,
  ) {
    super();
  }
}
