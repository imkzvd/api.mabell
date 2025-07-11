import { Inject } from '@nestjs/common';
import { QueryHandler } from '@nestjs/cqrs';
import { SearchService } from '@core/app/common/ports/search-service/search-service.port';
import { GetArtistsQuery } from '@core/app/cqrs/search/queries/get-artists/get-artists.query';
import { GetArtistsHandler as CoreGetArtistsHandler } from '@core/app/cqrs/search/queries/get-artists/get-artists.handler';
import { TypesenseService } from '@infrastructure/typesense';

@QueryHandler(GetArtistsQuery)
export class GetArtistsHandler extends CoreGetArtistsHandler {
  constructor(@Inject(TypesenseService) service: SearchService) {
    super(service);
  }
}
