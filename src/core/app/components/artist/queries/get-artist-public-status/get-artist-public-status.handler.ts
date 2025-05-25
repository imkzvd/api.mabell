import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetArtistPublicStatusQuery } from './get-artist-public-status.query';
import { ArtistService } from '../../artist.service';

@QueryHandler(GetArtistPublicStatusQuery)
export class GetArtistPublicStatusHandler implements IQueryHandler<GetArtistPublicStatusQuery> {
  constructor(@Inject(ArtistService) private readonly _artistService: ArtistService) {}

  async execute({ id }: GetArtistPublicStatusQuery) {
    return await this._artistService.getArtistPublicStatus(id);
  }
}
