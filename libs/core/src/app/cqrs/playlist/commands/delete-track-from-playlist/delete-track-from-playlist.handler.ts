import { CommandHandler } from '@core/app/types';
import { NotFoundException } from '@core/shared/exceptions';
import { PlaylistService } from '@core/app/components/playlist/playlist.service';
import { TrackService } from '@core/app/components/track/track.service';
import { DeleteTrackFromPlaylistCommand } from '@core/app/cqrs/playlist/commands/delete-track-from-playlist/delete-track-from-playlist.command';

export class DeleteTrackFromPlaylistHandler
  implements CommandHandler<DeleteTrackFromPlaylistCommand>
{
  constructor(
    private readonly _playlistService: PlaylistService,
    private readonly _trackService: TrackService,
  ) {}

  async execute({ playlistId, trackId }: DeleteTrackFromPlaylistCommand) {
    const verifiedTrackId = await this._trackService.verifyTrackId(trackId);

    if (!verifiedTrackId) {
      throw new NotFoundException('Track does not exist');
    }

    return await this._playlistService.deleteTrackFromPlaylist(playlistId, verifiedTrackId);
  }
}
