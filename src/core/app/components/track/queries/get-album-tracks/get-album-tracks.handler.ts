import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import {
  TRACK_READ_REPOSITORY_DI_TOKEN,
  TrackReadRepository,
} from '../../ports/repository/track-read-repository.port';
import { GetAlbumTracksQuery } from './get-album-tracks.query';
import {
  ALBUM_READ_REPOSITORY_DI_TOKEN,
  AlbumReadRepository,
} from '../../../album/ports/repository/album-read-repository.port';
import { OffsetLimitPaginationResponseDTO } from '../../../../common/dtos/offset-limit-pagination/offset-limit-pagination-response.dto';
import { NotFoundException } from '../../../../../shared/exceptions';
import TrackMapper from '../dtos/track.mapper';

@QueryHandler(GetAlbumTracksQuery)
export class GetAlbumTracksHandler implements IQueryHandler<GetAlbumTracksQuery> {
  constructor(
    @Inject(ALBUM_READ_REPOSITORY_DI_TOKEN)
    private readonly _albumReadRepository: AlbumReadRepository,
    @Inject(TRACK_READ_REPOSITORY_DI_TOKEN)
    private readonly _trackReadRepository: TrackReadRepository,
  ) {}

  async execute({ albumId, pagination }: GetAlbumTracksQuery) {
    const foundAlbum = await this._albumReadRepository.findById(albumId);

    if (!foundAlbum) {
      throw new NotFoundException('Album does not exist');
    }

    const slicedTrackIdList = foundAlbum.tracks.slice(0, pagination?.limit ?? 50);
    const foundTracks = await this._trackReadRepository.findByIds(slicedTrackIdList, true);

    return new OffsetLimitPaginationResponseDTO(
      foundTracks.items.map((i) => TrackMapper.toDTO(i)),
      foundTracks.items.length,
      pagination?.limit ?? 50,
      pagination?.offset ?? 0,
      foundTracks.items.length > (pagination?.limit ?? 50),
    );
  }
}
