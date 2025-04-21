import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetArtistByIdQuery } from './get-artist-by-id.query';
import {
  ARTIST_READ_REPOSITORY_DI_TOKEN,
  ArtistReadRepository,
} from '../../ports/repository/artist-read-repository.port';
import ArtistMapper from '../dtos/artist.mapper';

@QueryHandler(GetArtistByIdQuery)
export class GetArtistByIdHandler implements IQueryHandler<GetArtistByIdQuery> {
  constructor(
    @Inject(ARTIST_READ_REPOSITORY_DI_TOKEN)
    private readonly _artistReadRepository: ArtistReadRepository,
  ) {}

  async execute({ id }: GetArtistByIdQuery) {
    const foundArtist = await this._artistReadRepository.findById(id);

    return foundArtist ? ArtistMapper.toDTO(foundArtist) : null;
  }
}
