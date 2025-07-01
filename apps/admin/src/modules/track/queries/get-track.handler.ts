import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { TrackService } from '@core/app/components/track/track.service';
import { GetTrackQuery } from '@core/app/cqrs/track/queries/get-track/get-track.query';
import { GetTrackHandler as CoreGetTrackHandler } from '@core/app/cqrs/track/queries/get-track/get-track.handler';

@QueryHandler(GetTrackQuery)
export class GetTrackHandler implements IQueryHandler<GetTrackQuery> {
  private readonly _coreHandler: CoreGetTrackHandler;

  constructor(@Inject(TrackService) service: TrackService) {
    this._coreHandler = new CoreGetTrackHandler(service);
  }

  async execute(query: GetTrackQuery) {
    return this._coreHandler.execute(query);
  }
}
