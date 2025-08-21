import { QueryHandler } from '../../../../types';
import { GetUserQuery } from './get-user.query';
import { UserService } from '../../../../components/user';

export class GetUserHandler implements QueryHandler<GetUserQuery> {
  constructor(private readonly _service: UserService) {}

  execute({ id, options }: GetUserQuery) {
    return this._service.findById(id, options);
  }
}
