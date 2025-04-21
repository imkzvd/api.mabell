import { Query } from '@nestjs/cqrs';
import { AlbumDTO } from '../dtos/album.dto';

export class GetAlbumByIdQuery extends Query<AlbumDTO | null> {
  constructor(public readonly id: string) {
    super();
  }
}
