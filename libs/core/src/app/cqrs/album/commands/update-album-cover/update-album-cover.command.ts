import { Command } from '../../../../types';
import { UpdateAlbumCoverPayload } from '../../../../components/album/types';

export class UpdateAlbumCoverCommand extends Command<void> {
  constructor(
    public readonly id: string,
    public readonly payload: UpdateAlbumCoverPayload,
  ) {
    super();
  }
}
