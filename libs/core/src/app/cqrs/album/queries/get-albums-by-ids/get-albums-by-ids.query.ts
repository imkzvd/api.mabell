import { Query } from '../../../../types';
import { AlbumDTO } from '../../../../dtos';

export class GetAlbumsByIdsQuery extends Query<{
  items: (AlbumDTO | null)[];
  foundItems: AlbumDTO[];
  foundIds: string[];
  total: number;
  missingIds: string[];
}> {
  constructor(
    public readonly ids: string[],
    public readonly options?: Partial<{
      isPublic: boolean;
    }>,
  ) {
    super();
  }
}
