import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetUsersQuery } from './get-users.query';
import {
  USER_READ_REPOSITORY_DI_TOKEN,
  UserReadRepository,
} from '../../ports/repository/user-read-repository.port';

@QueryHandler(GetUsersQuery)
export class GetUsersHandler implements IQueryHandler<GetUsersQuery> {
  constructor(
    @Inject(USER_READ_REPOSITORY_DI_TOKEN)
    private readonly _userReadRepository: UserReadRepository,
  ) {}

  async execute({ pagination }: GetUsersQuery) {
    return this._userReadRepository.find({
      pagination,
    });
  }
}
