import { QueryHandler } from '@core/app/types';
import { ArtistService } from '@core/app/components/artist/artist.service';
import { GetArtistPublicStatusQuery } from '@core/app/cqrs/artist/queries/get-artist-public-status/get-artist-public-status.query';

export class GetArtistPublicStatusHandler implements QueryHandler<GetArtistPublicStatusQuery> {
  constructor(private readonly _artistService: ArtistService) {}

  async execute({ id }: GetArtistPublicStatusQuery) {
    return await this._artistService.getArtistPublicStatus(id);
  }
}
