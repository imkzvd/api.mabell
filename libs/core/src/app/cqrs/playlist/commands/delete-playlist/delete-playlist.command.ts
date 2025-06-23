import { Command } from '@nestjs/cqrs';
import { PlaylistId } from '../../../../../domain/components/playlist/types';

export class DeletePlaylistCommand extends Command<PlaylistId> {
  constructor(public readonly id: string) {
    super();
  }
}
