import { CommandHandler } from '@core/app/types';
import { UserCreateService } from '@core/app/components/user/services/user-create.service';
import { CreateUserCommand } from '@core/app/cqrs/user/commands/create-user/create-user.command';

export class CreateUserHandler implements CommandHandler<CreateUserCommand> {
  constructor(private readonly _service: UserCreateService) {}

  async execute() {
    return await this._service.create();
  }
}
