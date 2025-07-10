import { CommandHandler } from '@core/app/types';
import { NotFoundException } from '@core/shared/exceptions';
import { AddTrackInPlaylistCommand } from '@core/app/cqrs/playlist/commands/add-track-in-playlist/add-track-in-playlist.command';
import { TrackVerifyService } from '@core/app/components/track/services/track-verify.service';
import { PlaylistUpdateService } from '@core/app/components/playlist/services/playlist-update.service';

export class AddTrackInPlaylistHandler implements CommandHandler<AddTrackInPlaylistCommand> {
  constructor(
    private readonly _trackVerifyService: TrackVerifyService,
    private readonly _playlistUpdateService: PlaylistUpdateService,
  ) {}

  async execute({ playlistId, trackId }: AddTrackInPlaylistCommand) {
    const verifiedTrackId = await this._trackVerifyService.verify(trackId);

    if (!verifiedTrackId) {
      throw new NotFoundException('Track does not exist');
    }

    return await this._playlistUpdateService.addTrack(playlistId, verifiedTrackId);
  }
}
