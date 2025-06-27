import { Query } from '@core/app/types';
import { IndexedAlbumDTO } from '@core/app/common/ports/search-service/dtos/indexed-album.dto';

export class GetAlbumsQuery extends Query<IndexedAlbumDTO[]> {
  constructor(public readonly q: string) {
    super();
  }
}
