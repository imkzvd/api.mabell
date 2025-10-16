import { QueryHandler } from '../../../../types';
import { GetPlaylistsByGenreQuery } from './get-playlists-by-genre.query';
import { PlaylistService } from '../../../../components/playlist';

export class GetPlaylistsByGenreHandler implements QueryHandler<GetPlaylistsByGenreQuery> {
  constructor(private readonly _service: PlaylistService) {}

  execute({ genres, options }: GetPlaylistsByGenreQuery) {
    return this._service.getByGenres(genres, options);
  }
}
