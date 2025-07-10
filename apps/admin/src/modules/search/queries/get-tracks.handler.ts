import { QueryHandler } from '@nestjs/cqrs';
import { SearchService } from '@core/app/common/ports/search-service/search-service.port';
import { GetTracksQuery } from '@core/app/cqrs/search/queries/get-tracks/get-tracks.query';
import { GetTracksHandler as CoreGetTracksHandler } from '@core/app/cqrs/search/queries/get-tracks/get-tracks.handler';

@QueryHandler(GetTracksQuery)
export class GetTracksHandler extends CoreGetTracksHandler {
  constructor(service: SearchService) {
    super(service);
  }
}
