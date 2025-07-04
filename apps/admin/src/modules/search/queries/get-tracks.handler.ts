import { QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { SearchService } from '@core/app/common/ports/search-service/search-service.port';
import { TypesenseService } from '@infrastructure/typesense';
import { GetTracksQuery } from '@core/app/cqrs/search/queries/get-tracks/get-tracks.query';
import { GetTracksHandler as CoreGetTracksHandler } from '@core/app/cqrs/search/queries/get-tracks/get-tracks.handler';

@QueryHandler(GetTracksQuery)
export class GetTracksHandler extends CoreGetTracksHandler {
  constructor(@Inject(TypesenseService) service: SearchService) {
    super(service);
  }
}
