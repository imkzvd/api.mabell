import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetUserByIdQuery } from './get-user-by-id.query';
import {
  USER_READ_REPOSITORY_DI_TOKEN,
  UserReadRepository,
} from '../../ports/repository/user-read-repository.port';
import UserMapper from '../dtos/user.mapper';

@QueryHandler(GetUserByIdQuery)
export class GetUserByIdHandler implements IQueryHandler<GetUserByIdQuery> {
  constructor(
    @Inject(USER_READ_REPOSITORY_DI_TOKEN)
    private readonly _userReadRepository: UserReadRepository,
  ) {}

  async execute({ id }: GetUserByIdQuery) {
    const foundUser = await this._userReadRepository.findById(id);

    return foundUser ? UserMapper.toDTO(foundUser) : null;
  }
}
