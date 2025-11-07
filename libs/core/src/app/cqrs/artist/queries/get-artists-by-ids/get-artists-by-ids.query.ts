import { Query } from '../../../../types';
import { ArtistDTO } from '../../../../dtos';

export class GetArtistsByIdsQuery extends Query<{
  items: (ArtistDTO | null)[];
  foundItems: ArtistDTO[];
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
