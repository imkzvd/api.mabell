import { CommandHandler } from '@core/app/types';
import { UserUpdateService } from '@core/app/components/user/services/user-update.service';
import { UpdateUserEmailCommand } from '@core/app/cqrs/user/commands/update-user-email/update-user-email.command';

export class UpdateUserEmailHandler implements CommandHandler<UpdateUserEmailCommand> {
  constructor(private readonly _service: UserUpdateService) {}

  async execute({ id, email }: UpdateUserEmailCommand) {
    return await this._service.updateEmail(id, email);
  }
}
