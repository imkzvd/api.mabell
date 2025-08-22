import { QueryHandler } from '../../../../types';
import { GetArtistPublicStatusQuery } from './get-artist-public-status.query';
import { ArtistService } from '../../../../components/artist';

export class GetArtistPublicStatusHandler implements QueryHandler<GetArtistPublicStatusQuery> {
  constructor(private readonly _artistService: ArtistService) {}

  execute({ id }: GetArtistPublicStatusQuery) {
    return this._artistService.checkPublicStatus(id);
  }
}
