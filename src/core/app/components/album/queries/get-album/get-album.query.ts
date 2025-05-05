import { Query } from '@nestjs/cqrs';
import { AlbumDTO } from '../dtos/album.dto';

export class GetAlbumQuery extends Query<AlbumDTO | null> {
  constructor(
    public readonly id: string,
    public readonly isPublic?: boolean,
  ) {
    super();
  }
}
