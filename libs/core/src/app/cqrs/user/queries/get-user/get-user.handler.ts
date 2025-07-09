import { QueryHandler } from '@core/app/types';
import { UserFindService } from '@core/app/components/user/services/user-find.service';
import { GetUserQuery } from '@core/app/cqrs/user/queries/get-user/get-user.query';

export class GetUserHandler implements QueryHandler<GetUserQuery> {
  constructor(private readonly _service: UserFindService) {}

  async execute({ id, options }: GetUserQuery) {
    return await this._service.find(id, options);
  }
}
