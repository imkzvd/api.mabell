import { Command } from '@nestjs/cqrs';
import { AlbumId } from '../../../../../domain/components/album/types';

export class DeleteAlbumCommand extends Command<AlbumId> {
  constructor(public readonly id: string) {
    super();
  }
}
