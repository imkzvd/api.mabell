import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetUserQuery } from './get-user.query';
import { UserService } from '../../../../components/user/user.service';

@QueryHandler(GetUserQuery)
export class GetUserHandler implements IQueryHandler<GetUserQuery> {
  constructor(@Inject(UserService) private readonly _userService: UserService) {}

  async execute({ id, options }: GetUserQuery) {
    return await this._userService.getUser(id, options);
  }
}
