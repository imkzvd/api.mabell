import { Command } from '@nestjs/cqrs';
import { PlaylistId } from '../../../../../domain/components/playlist/types';

export class DeletePlaylistCoverCommand extends Command<PlaylistId> {
  constructor(public readonly id: string) {
    super();
  }
}
