import { CommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UserService } from '@core/app/components/user/user.service';
import { RefreshUserPasswordCommand } from '@core/app/cqrs/user/commands/refresh-user-password/refresh-user-password.command';
import { RefreshUserPasswordHandler as CoreRefreshUserPasswordHandler } from '@core/app/cqrs/user/commands/refresh-user-password/refresh-user-password.handler';

@CommandHandler(RefreshUserPasswordCommand)
export class RefreshUserPasswordHandler extends CoreRefreshUserPasswordHandler {
  constructor(@Inject(UserService) service: UserService) {
    super(service);
  }
}
