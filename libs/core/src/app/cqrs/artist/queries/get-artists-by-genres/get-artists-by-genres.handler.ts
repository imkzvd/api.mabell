import { QueryHandler } from '../../../../types';
import { ArtistService } from '../../../../components/artist';
import { GetArtistsByGenresQuery } from './get-artists-by-genres.query';

export class GetArtistsByGenresHandler implements QueryHandler<GetArtistsByGenresQuery> {
  constructor(private readonly _service: ArtistService) {}

  execute({ genres, options }: GetArtistsByGenresQuery) {
    return this._service.getByGenres(genres, options);
  }
}
