import { CommandHandler } from '@core/app/types';
import { NotFoundException } from '@core/shared/exceptions';
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
    const verifiedTrackId = await this._trackVerifyService.verify(trackId);

    if (!verifiedTrackId) {
      throw new NotFoundException('Track does not exist');
    }

    return await this._playlistUpdateService.deleteTrack(playlistId, verifiedTrackId);
  }
}
