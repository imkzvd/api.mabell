import { Command } from '@nestjs/cqrs';
import { AlbumId } from '../../../../../domain/components/album/types';
import { UpdateAlbumCoverPayload } from '../../../../components/album/types';

export class UpdateAlbumCoverCommand extends Command<AlbumId> {
  constructor(
    public readonly id: string,
    public readonly payload: UpdateAlbumCoverPayload,
  ) {
    super();
  }
}
