import { Query } from '../../../../types';
import { AlbumDTO } from '../../../../dtos';

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
