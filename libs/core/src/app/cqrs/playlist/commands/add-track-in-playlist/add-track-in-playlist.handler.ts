import { CommandHandler } from '@core/app/types';
import { NotFoundException } from '@core/shared/exceptions';
import { PlaylistService } from '@core/app/components/playlist/playlist.service';
import { TrackService } from '@core/app/components/track/track.service';
import { AddTrackInPlaylistCommand } from '@core/app/cqrs/playlist/commands/add-track-in-playlist/add-track-in-playlist.command';

export class AddTrackInPlaylistHandler implements CommandHandler<AddTrackInPlaylistCommand> {
  constructor(
    private readonly _playlistService: PlaylistService,
    private readonly _trackService: TrackService,
  ) {}

  async execute({ playlistId, trackId }: AddTrackInPlaylistCommand) {
    const verifiedTrackId = await this._trackService.verifyTrackId(trackId);

    if (!verifiedTrackId) {
      throw new NotFoundException('Track does not exist');
    }

    return await this._playlistService.addTrackInPlaylist(playlistId, verifiedTrackId);
  }
}
