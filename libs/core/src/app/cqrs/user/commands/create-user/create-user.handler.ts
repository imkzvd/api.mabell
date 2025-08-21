import { CommandHandler } from '../../../../types';
import { CreateUserCommand } from './create-user.command';
import { UserCreateService } from '../../../../components/user';

export class CreateUserHandler implements CommandHandler<CreateUserCommand> {
  constructor(private readonly _service: UserCreateService) {}

  async execute() {
    const id = await this._service.create();

    return { id };
  }
}
