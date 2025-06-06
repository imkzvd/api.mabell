import { Query } from '@nestjs/cqrs';
import { IndexedAlbumDTO } from '../../ports/search-service/dtos/indexed-album.dto';

export class GetAlbumsQuery extends Query<IndexedAlbumDTO[]> {
  constructor(public readonly q: string) {
    super();
  }
}
