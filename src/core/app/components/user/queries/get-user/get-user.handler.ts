import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetUserQuery } from './get-user.query';
import UserMapper from '../../dtos/user.mapper';
import { UserService } from '../../user.service';

@QueryHandler(GetUserQuery)
export class GetUserHandler implements IQueryHandler<GetUserQuery> {
  constructor(@Inject(UserService) private readonly _userService: UserService) {}

  async execute({ id, options }: GetUserQuery) {
    const foundUser = await this._userService.getUser(id, options);

    return foundUser ? UserMapper.toDTO(foundUser) : null;
  }
}
