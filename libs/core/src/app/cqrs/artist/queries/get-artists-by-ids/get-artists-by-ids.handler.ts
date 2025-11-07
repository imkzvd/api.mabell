import { QueryHandler } from '../../../../types';
import { ArtistService } from '../../../../components/artist';
import { GetArtistsByIdsQuery } from './get-artists-by-ids.query';

export class GetArtistsByIdsHandler implements QueryHandler<GetArtistsByIdsQuery> {
  constructor(private readonly _service: ArtistService) {}

  async execute({ ids, options }: GetArtistsByIdsQuery) {
    return this._service.findByIds(ids, options);
  }
}
