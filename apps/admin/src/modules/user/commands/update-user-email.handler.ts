import { CommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UserService } from '@core/app/components/user/user.service';
import { UpdateUserEmailCommand } from '@core/app/cqrs/user/commands/update-user-email/update-user-email.command';
import { UpdateUserEmailHandler as CoreUpdateUserEmailHandler } from '@core/app/cqrs/user/commands/update-user-email/update-user-email.handler';

@CommandHandler(UpdateUserEmailCommand)
export class UpdateUserEmailHandler extends CoreUpdateUserEmailHandler {
  constructor(@Inject(UserService) service: UserService) {
    super(service);
  }
}
