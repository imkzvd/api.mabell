import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetArtistsQuery } from './get-artists.query';
import {
  ARTIST_READ_REPOSITORY_DI_TOKEN,
  ArtistReadRepository,
} from '../../ports/repository/artist-read-repository.port';
import { OffsetLimitPaginationResponseDTO } from '../../../../common/dtos/offset-limit-pagination/offset-limit-pagination-response.dto';
import ArtistMapper from '../dtos/artist.mapper';

@QueryHandler(GetArtistsQuery)
export class GetArtistsHandler implements IQueryHandler<GetArtistsQuery> {
  constructor(
    @Inject(ARTIST_READ_REPOSITORY_DI_TOKEN)
    private readonly _artistReadRepository: ArtistReadRepository,
  ) {}

  async execute({ pagination }: GetArtistsQuery) {
    const foundArtists = await this._artistReadRepository.find({
      pagination,
    });

    return new OffsetLimitPaginationResponseDTO(
      foundArtists.items.map((artist) => ArtistMapper.toDTO(artist)),
      foundArtists.total,
      foundArtists.limit,
      foundArtists.offset,
      foundArtists.hasMore,
    );
  }
}
