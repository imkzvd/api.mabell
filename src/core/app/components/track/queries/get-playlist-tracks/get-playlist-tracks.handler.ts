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

  async execute({ playlistId, options }: GetPlaylistTracksQuery) {
    if (options?.isPublic) {
      const isPublicPlaylist = await this._playlistReadRepository.getPublicStatus(playlistId);

      if (!isPublicPlaylist) {
        throw new NotFoundException('Playlist not found');
      }
    }

    const foundPlaylistTracks = await this._playlistReadRepository.getTracks(playlistId, {
      pagination: options?.pagination,
    });
    const foundPlaylistTrackIds = foundPlaylistTracks.items.map(({ id }) => id);
    const foundTracks = await this._trackReadRepository.findByIds(foundPlaylistTrackIds, {
      isPublic: options?.isPublic,
    });

    return new OffsetLimitPaginationResponseDTO(
      foundTracks.items.map((i, index) =>
        TrackMapper.toPlaylistTrackDTO(i, foundPlaylistTracks.items[index].addedAt),
      ),
      foundPlaylistTracks.total,
      foundPlaylistTracks.limit,
      foundPlaylistTracks.offset,
      foundPlaylistTracks.hasMore,
    );
  }
}
