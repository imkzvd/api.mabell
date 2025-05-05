import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetUserQuery } from './get-user.query';
import {
  USER_READ_REPOSITORY_DI_TOKEN,
  UserReadRepository,
} from '../../ports/repository/user-read-repository.port';
import UserMapper from '../dtos/user.mapper';

@QueryHandler(GetUserQuery)
export class GetUserHandler implements IQueryHandler<GetUserQuery> {
  constructor(
    @Inject(USER_READ_REPOSITORY_DI_TOKEN)
    private readonly _userReadRepository: UserReadRepository,
  ) {}

  async execute({ id, isPublic }: GetUserQuery) {
    const foundUser = await this._userReadRepository.findById(id, {
      isPublic,
    });

    return foundUser ? UserMapper.toDTO(foundUser) : null;
  }
}
