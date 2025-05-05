import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetArtistQuery } from './get-artist.query';
import {
  ARTIST_READ_REPOSITORY_DI_TOKEN,
  ArtistReadRepository,
} from '../../ports/repository/artist-read-repository.port';
import ArtistMapper from '../dtos/artist.mapper';

@QueryHandler(GetArtistQuery)
export class GetArtistHandler implements IQueryHandler<GetArtistQuery> {
  constructor(
    @Inject(ARTIST_READ_REPOSITORY_DI_TOKEN)
    private readonly _artistReadRepository: ArtistReadRepository,
  ) {}

  async execute({ id, isPublic }: GetArtistQuery) {
    const foundArtist = await this._artistReadRepository.findById(id, {
      isPublic,
    });

    return foundArtist ? ArtistMapper.toDTO(foundArtist) : null;
  }
}
