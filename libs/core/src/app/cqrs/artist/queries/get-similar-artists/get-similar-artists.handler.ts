import { QueryHandler } from '../../../../types';
import { GetSimilarArtistsQuery } from './get-similar-artists.query';
import { ArtistService } from '../../../../components/artist';

export class GetSimilarArtistsHandler implements QueryHandler<GetSimilarArtistsQuery> {
  constructor(private readonly _service: ArtistService) {}

  async execute({ id, options }: GetSimilarArtistsQuery) {
    return this._service.getSimilarArtistsById(id, options);
  }
}
