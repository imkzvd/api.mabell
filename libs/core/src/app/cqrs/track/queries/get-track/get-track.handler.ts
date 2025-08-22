import { QueryHandler } from '../../../../types';
import { GetTrackQuery } from './get-track.query';
import { TrackService } from '../../../../components/track';

export class GetTrackHandler implements QueryHandler<GetTrackQuery> {
  constructor(private readonly _service: TrackService) {}

  async execute({ id, options }: GetTrackQuery) {
    return this._service.findById(id, options);
  }
}
