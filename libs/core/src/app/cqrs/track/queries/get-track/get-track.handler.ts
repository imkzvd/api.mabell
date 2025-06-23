import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetTrackQuery } from './get-track.query';
import { TrackService } from '../../../../components/track/track.service';

@QueryHandler(GetTrackQuery)
export class GetTrackHandler implements IQueryHandler<GetTrackQuery> {
  constructor(@Inject(TrackService) private readonly _trackService: TrackService) {}

  async execute({ id, isPublic }: GetTrackQuery) {
    return this._trackService.getTrack(id, { isPublic });
  }
}
