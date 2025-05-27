import { Command } from '@nestjs/cqrs';
import { UpdateAlbumCoverPayload } from '../../types';
import { AlbumId } from '../../../../../domain/components/album/types';

export class UpdateAlbumCoverCommand extends Command<AlbumId> {
  constructor(
    public readonly id: string,
    public readonly payload: UpdateAlbumCoverPayload,
  ) {
    super();
  }
}
