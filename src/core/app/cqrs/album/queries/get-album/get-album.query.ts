import { Query } from '@nestjs/cqrs';
import { AlbumDTO } from '../../../../components/album/dtos/album.dto';

export class GetAlbumQuery extends Query<AlbumDTO | null> {
  constructor(
    public readonly id: string,
    public readonly options?: Partial<{
      isPublic: boolean;
    }>,
  ) {
    super();
  }
}
