import { QueryHandler } from '@core/app/types';
import { UserService } from '@core/app/components/user/user.service';
import { GetUserQuery } from '@core/app/cqrs/user/queries/get-user/get-user.query';

export class GetUserHandler implements QueryHandler<GetUserQuery> {
  constructor(private readonly _userService: UserService) {}

  async execute({ id, options }: GetUserQuery) {
    return await this._userService.getUser(id, options);
  }
}
