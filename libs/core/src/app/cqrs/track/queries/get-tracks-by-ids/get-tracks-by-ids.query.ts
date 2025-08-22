import { Query } from '../../../../types';
import { TrackWithAlbumDTO } from '../../../../dtos';

export class GetTracksByIdsQuery extends Query<{
  items: (TrackWithAlbumDTO | null)[];
  foundItems: TrackWithAlbumDTO[];
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
