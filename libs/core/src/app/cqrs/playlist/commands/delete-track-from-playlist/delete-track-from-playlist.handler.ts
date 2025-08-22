import { CommandHandler } from '../../../../types';
import { DeleteTrackFromPlaylistCommand } from './delete-track-from-playlist.command';
import { TrackVerifyService } from '../../../../components/track';
import { PlaylistUpdateService } from '../../../../components/playlist';

export class DeleteTrackFromPlaylistHandler
  implements CommandHandler<DeleteTrackFromPlaylistCommand>
{
  constructor(
    private readonly _trackVerifyService: TrackVerifyService,
    private readonly _playlistUpdateService: PlaylistUpdateService,
  ) {}

  async execute({ playlistId, trackId }: DeleteTrackFromPlaylistCommand) {
    await this._playlistUpdateService.deleteTrack(playlistId, trackId);
  }
}
