import { Command } from '@nestjs/cqrs';
import { AlbumId } from '../../../../../domain/components/album/types';

export class CreateAlbumCommand extends Command<AlbumId> {
  constructor(public readonly artistId: string) {
    super();
  }
}
