import { Query } from '../../../../types';
import { PlaylistDTO } from '../../../../dtos';

export class GetPlaylistsByIdsQuery extends Query<{
  items: (PlaylistDTO | null)[];
  foundItems: PlaylistDTO[];
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
