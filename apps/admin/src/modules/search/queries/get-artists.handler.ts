import { QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { SearchService } from '@core/app/common/ports/search-service/search-service.port';
import { TypesenseService } from '@infrastructure/typesense';
import { GetArtistsQuery } from '@core/app/cqrs/search/queries/get-artists/get-artists.query';
import { GetArtistsHandler as CoreGetArtistsHandler } from '@core/app/cqrs/search/queries/get-artists/get-artists.handler';

@QueryHandler(GetArtistsQuery)
export class GetArtistsHandler extends CoreGetArtistsHandler {
  constructor(@Inject(TypesenseService) service: SearchService) {
    super(service);
  }
}
