import { Command } from '../../../../types';
import { UpdateAlbumPayload } from '../../../../components/album/types';

export class UpdateAlbumCommand extends Command<void> {
  constructor(
    public readonly id: string,
    public readonly payload: UpdateAlbumPayload,
  ) {
    super();
  }
}
