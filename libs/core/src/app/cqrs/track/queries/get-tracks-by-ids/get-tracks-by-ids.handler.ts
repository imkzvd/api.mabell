import { QueryHandler } from '@core/app/types';
import { TrackService } from '@core/app/components/track/track.service';
import { GetTracksByIdsQuery } from '@core/app/cqrs/track/queries/get-tracks-by-ids/get-tracks-by-ids.query';

export class GetTrackByIdsHandler implements QueryHandler<GetTracksByIdsQuery> {
  constructor(private readonly _trackService: TrackService) {}

  async execute({ ids, options }: GetTracksByIdsQuery) {
    return this._trackService.getTracksByIds(ids, options);
  }
}
