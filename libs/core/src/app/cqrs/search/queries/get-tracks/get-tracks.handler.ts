import { QueryHandler } from '@core/app/types';
import { GetTracksQuery } from '@core/app/cqrs/search/queries/get-tracks/get-tracks.query';
import { SearchService } from '@core/app/common/ports/search-service/search-service.port';

export class GetTracksHandler implements QueryHandler<GetTracksQuery> {
  constructor(private readonly _service: SearchService) {}

  async execute({ q }: GetTracksQuery) {
    return this._service.findTracks(q);
  }
}
