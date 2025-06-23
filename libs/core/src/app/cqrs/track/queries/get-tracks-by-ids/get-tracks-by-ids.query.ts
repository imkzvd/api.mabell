import { Query } from '@nestjs/cqrs';
import { TrackDTO } from '../../../../components/track/dtos/track.dto';

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
