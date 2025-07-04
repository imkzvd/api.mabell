import { QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { SearchService } from '@core/app/common/ports/search-service/search-service.port';
import { TypesenseService } from '@infrastructure/typesense';
import { GetItemsQuery } from '@core/app/cqrs/search/queries/get-items/get-items.query';
import { GetItemsHandler as CoreGetItemsHandler } from '@core/app/cqrs/search/queries/get-items/get-items.handler';

@QueryHandler(GetItemsQuery)
export class GetItemsHandler extends CoreGetItemsHandler {
  constructor(@Inject(TypesenseService) service: SearchService) {
    super(service);
  }
}
