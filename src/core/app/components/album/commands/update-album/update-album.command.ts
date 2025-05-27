import { Command } from '@nestjs/cqrs';
import { UpdateAlbumPayload } from '../../types';
import { AlbumId } from '../../../../../domain/components/album/types';

export class UpdateAlbumCommand extends Command<AlbumId> {
  constructor(
    public readonly id: string,
    public readonly payload: UpdateAlbumPayload,
  ) {
    super();
  }
}
