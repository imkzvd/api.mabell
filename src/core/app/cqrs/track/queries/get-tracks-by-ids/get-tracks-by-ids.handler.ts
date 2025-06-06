import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { TrackService } from '../../../../components/track/track.service';
import { GetTracksByIdsQuery } from './get-tracks-by-ids.query';

@QueryHandler(GetTracksByIdsQuery)
export class GetTrackByIdsHandler implements IQueryHandler<GetTracksByIdsQuery> {
  constructor(@Inject(TrackService) private readonly _trackService: TrackService) {}

  async execute({ ids, options }: GetTracksByIdsQuery) {
    return this._trackService.getTracksByIds(ids, options);
  }
}
