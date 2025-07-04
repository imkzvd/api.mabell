import { QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetUserQuery } from '@core/app/cqrs/user/queries/get-user/get-user.query';
import { GetUserHandler as CoreGetUserHandler } from '@core/app/cqrs/user/queries/get-user/get-user.handler';
import { UserService } from '@core/app/components/user/user.service';

@QueryHandler(GetUserQuery)
export class GetUserHandler extends CoreGetUserHandler {
  constructor(@Inject(UserService) service: UserService) {
    super(service);
  }
}
