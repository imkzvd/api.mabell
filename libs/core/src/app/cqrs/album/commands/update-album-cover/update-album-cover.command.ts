import { Command } from '@core/app/types';
import { AlbumId } from '@core/domain/components/album/types';
import { UpdateAlbumCoverPayload } from '@core/app/components/album/types';

export class UpdateAlbumCoverCommand extends Command<AlbumId> {
  constructor(
    public readonly id: string,
    public readonly payload: UpdateAlbumCoverPayload,
  ) {
    super();
  }
}
