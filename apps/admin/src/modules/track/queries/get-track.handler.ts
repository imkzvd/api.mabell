import { QueryHandler } from '@nestjs/cqrs';
import { GetTrackQuery } from '@core/app/cqrs/track/queries/get-track/get-track.query';
import { GetTrackHandler as CoreGetTrackHandler } from '@core/app/cqrs/track/queries/get-track/get-track.handler';
import { TrackService } from '@core/app/components/track/services/track.service';

@QueryHandler(GetTrackQuery)
export class GetTrackHandler extends CoreGetTrackHandler {
  constructor(service: TrackService) {
    super(service);
  }
}
