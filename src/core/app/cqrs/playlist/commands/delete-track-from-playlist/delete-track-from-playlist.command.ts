import { Command } from '@nestjs/cqrs';
import { PlaylistId } from '../../../../../domain/components/playlist/types';

export class DeleteTrackFromPlaylistCommand extends Command<PlaylistId> {
  constructor(
    public readonly playlistId: string,
    public readonly trackId: string,
  ) {
    super();
  }
}
