import { QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetUserQuery } from '@core/app/cqrs/user/queries/get-user/get-user.query';
import { GetUserHandler as CoreGetUserHandler } from '@core/app/cqrs/user/queries/get-user/get-user.handler';
import { UserFindService } from '@core/app/components/user/services/user-find.service';

@QueryHandler(GetUserQuery)
export class GetUserHandler extends CoreGetUserHandler {
  constructor(@Inject(UserFindService) service: UserFindService) {
    super(service);
  }
}
