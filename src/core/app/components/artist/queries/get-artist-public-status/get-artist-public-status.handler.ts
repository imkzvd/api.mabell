import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import {
  ARTIST_READ_REPOSITORY_DI_TOKEN,
  ArtistReadRepository,
} from '../../ports/repository/artist-read-repository.port';
import { GetArtistPublicStatusQuery } from './get-artist-public-status.query';
import { NotFoundException } from '../../../../../shared/exceptions';

@QueryHandler(GetArtistPublicStatusQuery)
export class GetArtistPublicStatusHandler implements IQueryHandler<GetArtistPublicStatusQuery> {
  constructor(
    @Inject(ARTIST_READ_REPOSITORY_DI_TOKEN)
    private readonly _artistReadRepository: ArtistReadRepository,
  ) {}

  async execute({ id }: GetArtistPublicStatusQuery) {
    const foundArtist = await this._artistReadRepository.findById(id);

    if (!foundArtist) {
      throw new NotFoundException('Artist does not exist');
    }

    return foundArtist.isPublic;
  }
}
