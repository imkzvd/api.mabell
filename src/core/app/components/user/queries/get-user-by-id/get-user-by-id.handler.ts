import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetUserByIdQuery } from './get-user-by-id.query';
import {
  USER_READ_REPOSITORY_DI_TOKEN,
  UserReadRepository,
} from '../../ports/repository/user-read-repository.port';

@QueryHandler(GetUserByIdQuery)
export class GetUserByIdHandler implements IQueryHandler<GetUserByIdQuery> {
  constructor(
    @Inject(USER_READ_REPOSITORY_DI_TOKEN)
    private readonly _userReadRepository: UserReadRepository,
  ) {}

  async execute({ id }: GetUserByIdQuery) {
    return this._userReadRepository.findById(id);
  }
}
