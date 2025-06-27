import { Query } from '@core/app/types';
import { TrackDTO } from '@core/app/components/track/dtos/track.dto';

export class GetTrackQuery extends Query<TrackDTO | null> {
  constructor(
    public readonly id: string,
    public readonly isPublic?: boolean,
  ) {
    super();
  }
}
