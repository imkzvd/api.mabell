import { Command } from '@nestjs/cqrs';
import { AlbumId } from '../../../../../domain/components/album/types';
import { UpdateAlbumPayload } from '../../../../components/album/types';

export class UpdateAlbumCommand extends Command<AlbumId> {
  constructor(
    public readonly id: string,
    public readonly payload: UpdateAlbumPayload,
  ) {
    super();
  }
}
