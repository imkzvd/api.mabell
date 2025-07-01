import { Command } from '@core/app/types';
import { PlaylistId } from '@core/domain/components/playlist/types';

export class DeleteTrackFromPlaylistCommand extends Command<PlaylistId> {
  constructor(
    public readonly playlistId: string,
    public readonly trackId: string,
  ) {
    super();
  }
}
