import { QueryHandler } from '@core/app/types';
import { GetTracksByIdsQuery } from '@core/app/cqrs/track/queries/get-tracks-by-ids/get-tracks-by-ids.query';
import { TrackService } from '@core/app/components/track/services/track.service';

export class GetTrackByIdsHandler implements QueryHandler<GetTracksByIdsQuery> {
  constructor(private readonly _service: TrackService) {}

  async execute({ ids, options }: GetTracksByIdsQuery) {
    return this._service.findByIds(ids, options);
  }
}
