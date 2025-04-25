import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import {
  TRACK_READ_REPOSITORY_DI_TOKEN,
  TrackReadRepository,
} from '../../ports/repository/track-read-repository.port';
import { GetPlaylistTracksQuery } from './get-playlist-tracks.query';
import { OffsetLimitPaginationResponseDTO } from '../../../../common/dtos/offset-limit-pagination/offset-limit-pagination-response.dto';
import { NotFoundException } from '../../../../../shared/exceptions';
import TrackMapper from '../dtos/track.mapper';
import {
  PLAYLIST_READ_REPOSITORY_DI_TOKEN,
  PlaylistReadRepository,
} from '../../../playlist/ports/repository/playlist-read-repository.port';

@QueryHandler(GetPlaylistTracksQuery)
export class GetPlaylistTracksHandler implements IQueryHandler<GetPlaylistTracksQuery> {
  constructor(
    @Inject(PLAYLIST_READ_REPOSITORY_DI_TOKEN)
    private readonly _playlistReadRepository: PlaylistReadRepository,
    @Inject(TRACK_READ_REPOSITORY_DI_TOKEN)
    private readonly _trackReadRepository: TrackReadRepository,
  ) {}

  async execute({ playlistId, pagination }: GetPlaylistTracksQuery) {
    const foundPlaylist = await this._playlistReadRepository.findById(playlistId);

    if (!foundPlaylist) {
      throw new NotFoundException('Playlist does not exist');
    }

    const slicedTrackIdList = foundPlaylist.tracks
      .slice(pagination?.offset, pagination?.limit || 50)
      .map(({ id }) => id);
    const foundTracks = await this._trackReadRepository.findByIds(slicedTrackIdList, true);

    return new OffsetLimitPaginationResponseDTO(
      foundTracks.items.map((i, index) =>
        TrackMapper.toPlaylistTrackDTO(i, foundPlaylist.tracks[index].addedAt),
      ),
      foundTracks.items.length,
      pagination?.limit ?? 50,
      pagination?.offset ?? 0,
      foundTracks.items.length > (pagination?.limit ?? 50),
    );
  }
}
