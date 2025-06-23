import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { NotFoundException } from '../../../../../shared/exceptions';
import { DeleteTrackFromPlaylistCommand } from './delete-track-from-playlist.command';
import { PlaylistService } from '../../../../components/playlist/playlist.service';
import { TrackService } from '../../../../components/track/track.service';

@CommandHandler(DeleteTrackFromPlaylistCommand)
export class DeleteTrackFromPlaylistHandler
  implements ICommandHandler<DeleteTrackFromPlaylistCommand>
{
  constructor(
    @Inject(PlaylistService) private readonly _playlistService: PlaylistService,
    @Inject(TrackService) private readonly _trackService: TrackService,
  ) {}

  async execute({ playlistId, trackId }: DeleteTrackFromPlaylistCommand) {
    const verifiedTrackId = await this._trackService.verifyTrackId(trackId);

    if (!verifiedTrackId) {
      throw new NotFoundException('Track does not exist');
    }

    return await this._playlistService.deleteTrackFromPlaylist(playlistId, verifiedTrackId);
  }
}
