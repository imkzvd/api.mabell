import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { SearchService } from '@core/app/common/ports/search-service/search-service.port';
import { TypesenseService } from '@infrastructure/typesense';
import { GetTracksQuery } from '@core/app/cqrs/search/queries/get-tracks/get-tracks.query';
import { GetTracksHandler as CoreGetTracksHandler } from '@core/app/cqrs/search/queries/get-tracks/get-tracks.handler';

@QueryHandler(GetTracksQuery)
export class GetTracksHandler implements IQueryHandler<GetTracksQuery> {
  private readonly coreHandler: CoreGetTracksHandler;

  constructor(@Inject(TypesenseService) service: SearchService) {
    this.coreHandler = new CoreGetTracksHandler(service);
  }

  async execute(query: GetTracksQuery) {
    return this.coreHandler.execute(query);
  }
}
