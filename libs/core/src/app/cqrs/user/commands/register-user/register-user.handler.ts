import { CommandHandler } from '../../../../types';
import { RegisterUserCommand } from './register-user.command';
import { UserRegistrationService } from '../../../../components/user';

export class RegisterUserHandler implements CommandHandler<RegisterUserCommand> {
  constructor(private readonly _service: UserRegistrationService) {}

  async execute({ payload }: RegisterUserCommand) {
    const id = await this._service.register(payload);

    return { id };
  }
}
