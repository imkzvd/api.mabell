import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import {
  TRACK_READ_REPOSITORY_DI_TOKEN,
  TrackReadRepository,
} from '../../ports/repository/track-read-repository.port';
import { GetArtistTracksQuery } from './get-artist-tracks.query';
import { OffsetLimitPaginationResponseDTO } from '../../../../common/dtos/offset-limit-pagination/offset-limit-pagination-response.dto';
import TrackMapper from '../dtos/track.mapper';
import { NotFoundException } from '../../../../../shared/exceptions';
import {
  ARTIST_READ_REPOSITORY_DI_TOKEN,
  ArtistReadRepository,
} from '../../../artist/ports/repository/artist-read-repository.port';

@QueryHandler(GetArtistTracksQuery)
export class GetArtistTracksHandler implements IQueryHandler<GetArtistTracksQuery> {
  constructor(
    @Inject(ARTIST_READ_REPOSITORY_DI_TOKEN)
    private readonly _artistReadRepository: ArtistReadRepository,
    @Inject(TRACK_READ_REPOSITORY_DI_TOKEN)
    private readonly _trackReadRepository: TrackReadRepository,
  ) {}

  async execute({ artistId, options }: GetArtistTracksQuery) {
    if (options?.isPublic) {
      const isPublicArtist = await this._artistReadRepository.getPublicStatus(artistId);

      if (!isPublicArtist) {
        throw new NotFoundException('Artist not found');
      }
    }

    const foundTracks = await this._trackReadRepository.findByArtistId(artistId, {
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
