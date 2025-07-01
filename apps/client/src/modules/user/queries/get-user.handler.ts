import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUserQuery } from '@core/app/cqrs/user/queries/get-user/get-user.query';
import { GetUserHandler as CoreGetUserHandler } from '@core/app/cqrs/user/queries/get-user/get-user.handler';
import { UserService } from '@core/app/components/user/user.service';
import { Inject } from '@nestjs/common';

@QueryHandler(GetUserQuery)
export class GetUserHandler implements IQueryHandler<GetUserQuery> {
  private readonly coreHandler: CoreGetUserHandler;

  constructor(@Inject(UserService) readonly userService: UserService) {
    this.coreHandler = new CoreGetUserHandler(userService);
  }

  async execute(query: GetUserQuery) {
    return this.coreHandler.execute(query);
  }
}
