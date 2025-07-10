import { QueryHandler } from '@nestjs/cqrs';
import { GetAlbumsQuery } from '@core/app/cqrs/search/queries/get-albums/get-albums.query';
import { GetAlbumsHandler as CoreGetAlbumsHandler } from '@core/app/cqrs/search/queries/get-albums/get-albums.handler';
import { SearchService } from '@core/app/common/ports/search-service/search-service.port';

@QueryHandler(GetAlbumsQuery)
export class GetAlbumsHandler extends CoreGetAlbumsHandler {
  constructor(service: SearchService) {
    super(service);
  }
}
