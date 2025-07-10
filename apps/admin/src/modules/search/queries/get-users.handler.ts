import { QueryHandler } from '@nestjs/cqrs';
import { SearchService } from '@core/app/common/ports/search-service/search-service.port';
import { GetUsersQuery } from '@core/app/cqrs/search/queries/get-users/get-users.query';
import { GetUsersHandler as CoreGetUsersHandler } from '@core/app/cqrs/search/queries/get-users/get-users.handler';

@QueryHandler(GetUsersQuery)
export class GetUsersHandler extends CoreGetUsersHandler {
  constructor(service: SearchService) {
    super(service);
  }
}
