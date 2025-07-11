import { CommandHandler } from '@nestjs/cqrs';
import { UserUpdateService } from '@core/app/components/user/services/user-update.service';
import { RefreshUserPasswordCommand } from '@core/app/cqrs/user/commands/refresh-user-password/refresh-user-password.command';
import { RefreshUserPasswordHandler as CoreRefreshUserPasswordHandler } from '@core/app/cqrs/user/commands/refresh-user-password/refresh-user-password.handler';

@CommandHandler(RefreshUserPasswordCommand)
export class RefreshUserPasswordHandler extends CoreRefreshUserPasswordHandler {
  constructor(service: UserUpdateService) {
    super(service);
  }
}
