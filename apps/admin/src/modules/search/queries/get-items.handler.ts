import { QueryHandler } from '@nestjs/cqrs';
import { SearchService } from '@core/app/common/ports/search-service/search-service.port';
import { GetItemsQuery } from '@core/app/cqrs/search/queries/get-items/get-items.query';
import { GetItemsHandler as CoreGetItemsHandler } from '@core/app/cqrs/search/queries/get-items/get-items.handler';

@QueryHandler(GetItemsQuery)
export class GetItemsHandler extends CoreGetItemsHandler {
  constructor(service: SearchService) {
    super(service);
  }
}
