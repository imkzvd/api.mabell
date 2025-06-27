import { Query } from '@core/app/types';
import { TrackDTO } from '@core/app/components/track/dtos/track.dto';

export class GetTracksByIdsQuery extends Query<{
  items: (TrackDTO | null)[];
  foundItems: TrackDTO[];
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
