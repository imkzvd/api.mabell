import { TrackService } from '@core/app/components/track/track.service';
import { QueryHandler } from '@core/app/types';
import { GetTrackQuery } from '@core/app/cqrs/track/queries/get-track/get-track.query';

export class GetTrackHandler implements QueryHandler<GetTrackQuery> {
  constructor(private readonly _trackService: TrackService) {}

  async execute({ id, isPublic }: GetTrackQuery) {
    return this._trackService.getTrack(id, { isPublic });
  }
}
