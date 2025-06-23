import { Query } from '@nestjs/cqrs';
import { TrackDTO } from '../../../../components/track/dtos/track.dto';

export class GetTrackQuery extends Query<TrackDTO | null> {
  constructor(
    public readonly id: string,
    public readonly isPublic?: boolean,
  ) {
    super();
  }
}
