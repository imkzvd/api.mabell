import { Command } from '@nestjs/cqrs';
import { PlaylistId } from '../../../../../domain/components/playlist/types';

export class CreatePlaylistCommand extends Command<PlaylistId> {
  constructor(public readonly ownerId: string) {
    super();
  }
}
