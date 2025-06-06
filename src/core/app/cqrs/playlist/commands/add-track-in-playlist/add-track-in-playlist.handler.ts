import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { NotFoundException } from '../../../../../shared/exceptions';
import { AddTrackInPlaylistCommand } from './add-track-in-playlist.command';
import { PlaylistService } from '../../../../components/playlist/playlist.service';
import { TrackService } from '../../../../components/track/track.service';

@CommandHandler(AddTrackInPlaylistCommand)
export class AddTrackInPlaylistHandler implements ICommandHandler<AddTrackInPlaylistCommand> {
  constructor(
    @Inject(PlaylistService) private readonly _playlistService: PlaylistService,
    @Inject(TrackService) private readonly _trackService: TrackService,
  ) {}

  async execute({ playlistId, trackId }: AddTrackInPlaylistCommand) {
    const verifiedTrackId = await this._trackService.verifyTrackId(trackId);

    if (!verifiedTrackId) {
      throw new NotFoundException('Track does not exist');
    }

    return await this._playlistService.addTrackInPlaylist(playlistId, verifiedTrackId);
  }
}
