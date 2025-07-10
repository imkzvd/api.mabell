import { QueryHandler } from '@core/app/types';
import { GetUserQuery } from '@core/app/cqrs/user/queries/get-user/get-user.query';
import { UserService } from '@core/app/components/user/services/user.service';

export class GetUserHandler implements QueryHandler<GetUserQuery> {
  constructor(private readonly _service: UserService) {}

  async execute({ id, options }: GetUserQuery) {
    return await this._service.find(id, options);
  }
}
