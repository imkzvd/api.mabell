import { QueryHandler } from '../../../../types';
import { GetTracksQuery } from './get-tracks.query';
import { SearchService } from '../../../../ports';

export class GetTracksHandler implements QueryHandler<GetTracksQuery> {
  constructor(private readonly _service: SearchService) {}

  execute({ q }: GetTracksQuery) {
    return this._service.findTracks(q);
  }
}
