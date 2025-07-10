import { CommandHandler } from '@nestjs/cqrs';
import { UserUpdateService } from '@core/app/components/user/services/user-update.service';
import { UpdateUserEmailCommand } from '@core/app/cqrs/user/commands/update-user-email/update-user-email.command';
import { UpdateUserEmailHandler as CoreUpdateUserEmailHandler } from '@core/app/cqrs/user/commands/update-user-email/update-user-email.handler';

@CommandHandler(UpdateUserEmailCommand)
export class UpdateUserEmailHandler extends CoreUpdateUserEmailHandler {
  constructor(service: UserUpdateService) {
    super(service);
  }
}
