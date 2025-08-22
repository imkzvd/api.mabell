import { CommandHandler } from '../../../../types';
import { AddTrackInPlaylistCommand } from './add-track-in-playlist.command';
import { TrackVerifyService } from '../../../../components/track';
import { PlaylistUpdateService } from '../../../../components/playlist';
import { NotFoundException } from '../../../../../shared/exceptions';

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

    await this._playlistUpdateService.addTrack(playlistId, verifiedTrackId);
  }
}
