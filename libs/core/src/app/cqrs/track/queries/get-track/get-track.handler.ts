import { QueryHandler } from '@core/app/types';
import { GetTrackQuery } from '@core/app/cqrs/track/queries/get-track/get-track.query';
import { TrackService } from '@core/app/components/track/services/track.service';

export class GetTrackHandler implements QueryHandler<GetTrackQuery> {
  constructor(private readonly _service: TrackService) {}

  async execute({ id, isPublic }: GetTrackQuery) {
    return this._service.find(id, { isPublic });
  }
}
