import { QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetAlbumsQuery } from '@core/app/cqrs/search/queries/get-albums/get-albums.query';
import { GetAlbumsHandler as CoreGetAlbumsHandler } from '@core/app/cqrs/search/queries/get-albums/get-albums.handler';
import { SearchService } from '@core/app/common/ports/search-service/search-service.port';
import { TypesenseService } from '@infrastructure/typesense';

@QueryHandler(GetAlbumsQuery)
export class GetAlbumsHandler extends CoreGetAlbumsHandler {
  constructor(@Inject(TypesenseService) service: SearchService) {
    super(service);
  }
}
