import { QueryHandler } from '../../../../types';
import { GetArtistQuery } from './get-artist.query';
import { ArtistService } from '../../../../components/artist';

export class GetArtistHandler implements QueryHandler<GetArtistQuery> {
  constructor(private readonly _service: ArtistService) {}

  async execute({ id, options }: GetArtistQuery) {
    return this._service.findById(id, options);
  }
}
