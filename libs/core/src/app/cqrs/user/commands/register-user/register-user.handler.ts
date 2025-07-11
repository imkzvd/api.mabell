import { CommandHandler } from '@core/app/types';
import { UserRegistrationService } from '@core/app/components/user/services/user-registration.service';
import { RegisterUserCommand } from '@core/app/cqrs/user/commands/register-user/register-user.command';

export class RegisterUserHandler implements CommandHandler<RegisterUserCommand> {
  constructor(private readonly _service: UserRegistrationService) {}

  async execute({ payload }: RegisterUserCommand) {
    return await this._service.register(payload);
  }
}
