import { QueryHandler } from '../../../../types';
import { GetArtistsQuery } from './get-artists.query';
import { SearchService } from '../../../../ports';

export class GetArtistsHandler implements QueryHandler<GetArtistsQuery> {
  constructor(private readonly _service: SearchService) {}

  execute({ q }: GetArtistsQuery) {
    return this._service.findArtists(q);
  }
}
