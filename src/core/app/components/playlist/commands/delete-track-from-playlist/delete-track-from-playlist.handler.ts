import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { NotFoundException } from '../../../../../shared/exceptions';
import {
  PLAYLIST_WRITE_REPOSITORY_DI_TOKEN,
  PlaylistWriteRepository,
} from '../../../../../domain/components/playlist/repository/playlist-write-repository.port';
import {
  TRACK_WRITE_REPOSITORY_DI_TOKEN,
  TrackWriteRepository,
} from '../../../../../domain/components/track/repository/track-write-repository.port';
import { DeleteTrackFromPlaylistCommand } from './delete-track-from-playlist.command';

@CommandHandler(DeleteTrackFromPlaylistCommand)
export class DeleteTrackFromPlaylistHandler
  implements ICommandHandler<DeleteTrackFromPlaylistCommand>
{
  constructor(
    @Inject(PLAYLIST_WRITE_REPOSITORY_DI_TOKEN)
    private readonly _playlistWriteRepository: PlaylistWriteRepository,
    @Inject(TRACK_WRITE_REPOSITORY_DI_TOKEN)
    private readonly _trackWriteRepository: TrackWriteRepository,
  ) {}

  async execute({ playlistId, trackId }: DeleteTrackFromPlaylistCommand) {
    const foundPlaylist = await this._playlistWriteRepository.findById(playlistId);

    if (!foundPlaylist) {
      throw new NotFoundException('Playlist does not exist');
    }

    const existTrackId = await this._trackWriteRepository.existsById(trackId);

    if (!existTrackId) {
      throw new NotFoundException('Track does not exist');
    }

    foundPlaylist.deleteTrack(existTrackId);

    return this._playlistWriteRepository.save(foundPlaylist);
  }
}
