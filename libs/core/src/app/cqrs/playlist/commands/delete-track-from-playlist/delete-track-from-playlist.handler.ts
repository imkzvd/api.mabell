import { CommandHandler } from '@core/app/types';
import { DeleteTrackFromPlaylistCommand } from '@core/app/cqrs/playlist/commands/delete-track-from-playlist/delete-track-from-playlist.command';
import { PlaylistUpdateService } from '@core/app/components/playlist/services/playlist-update.service';
import { TrackVerifyService } from '@core/app/components/track/services/track-verify.service';

export class DeleteTrackFromPlaylistHandler
  implements CommandHandler<DeleteTrackFromPlaylistCommand>
{
  constructor(
    private readonly _trackVerifyService: TrackVerifyService,
    private readonly _playlistUpdateService: PlaylistUpdateService,
  ) {}

  async execute({ playlistId, trackId }: DeleteTrackFromPlaylistCommand) {
    return await this._playlistUpdateService.deleteTrack(playlistId, trackId);
  }
}
