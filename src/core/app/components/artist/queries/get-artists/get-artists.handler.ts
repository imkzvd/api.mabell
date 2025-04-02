import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetArtistsQuery } from './get-artists.query';
import {
  ARTIST_READ_REPOSITORY_DI_TOKEN,
  ArtistReadRepository,
} from '../../ports/repository/artist-read-repository.port';

@QueryHandler(GetArtistsQuery)
export class GetArtistsHandler implements IQueryHandler<GetArtistsQuery> {
  constructor(
    @Inject(ARTIST_READ_REPOSITORY_DI_TOKEN)
    private readonly _artistReadRepository: ArtistReadRepository,
  ) {}

  async execute({ pagination }: GetArtistsQuery) {
    return this._artistReadRepository.find({
      pagination,
    });
  }
}
