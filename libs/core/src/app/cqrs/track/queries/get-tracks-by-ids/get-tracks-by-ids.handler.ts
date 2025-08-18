import { QueryHandler } from '../../../../types';
import { GetTracksByIdsQuery } from './get-tracks-by-ids.query';
import { TrackService } from '../../../../components/track';

export class GetTrackByIdsHandler implements QueryHandler<GetTracksByIdsQuery> {
  constructor(private readonly _service: TrackService) {}

  async execute({ ids, options }: GetTracksByIdsQuery) {
    return this._service.findByIds(ids, options);
  }
}
