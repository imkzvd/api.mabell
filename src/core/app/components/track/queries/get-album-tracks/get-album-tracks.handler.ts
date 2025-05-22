import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetAlbumTracksQuery } from './get-album-tracks.query';
import { NotFoundException } from '../../../../../shared/exceptions';
import TrackMapper from '../dtos/track.mapper';
import {
  ALBUM_READ_REPOSITORY_DI_TOKEN,
  AlbumReadRepository,
} from '../../../../../domain/components/album/repository/album-read-repository.port';
import {
  TRACK_READ_REPOSITORY_DI_TOKEN,
  TrackReadRepository,
} from '../../../../../domain/components/track/repository/track-read-repository.port';
import { OffsetLimitPaginationResponseDTO } from '../../../../../shared/dtos/offset-limit-pagination/offset-limit-pagination-response.dto';

@QueryHandler(GetAlbumTracksQuery)
export class GetAlbumTracksHandler implements IQueryHandler<GetAlbumTracksQuery> {
  constructor(
    @Inject(ALBUM_READ_REPOSITORY_DI_TOKEN)
    private readonly _albumReadRepository: AlbumReadRepository,
    @Inject(TRACK_READ_REPOSITORY_DI_TOKEN)
    private readonly _trackReadRepository: TrackReadRepository,
  ) {}

  async execute({ albumId, options }: GetAlbumTracksQuery) {
    const isPublicAlbum = await this._albumReadRepository.getPublicStatus(albumId);

    if (options?.isPublic && !isPublicAlbum) {
      throw new NotFoundException('Album not found');
    }

    const foundTracks = await this._trackReadRepository.findByAlbumId(albumId, {
      isPublic: options?.isPublic,
      pagination: options?.pagination,
    });

    return new OffsetLimitPaginationResponseDTO(
      foundTracks.items.map((i) => TrackMapper.toDTO(i)),
      foundTracks.total,
      foundTracks.limit,
      foundTracks.offset,
      foundTracks.hasMore,
    );
  }
}
