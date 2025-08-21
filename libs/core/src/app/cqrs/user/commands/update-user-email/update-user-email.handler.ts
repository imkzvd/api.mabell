import { CommandHandler } from '../../../../types';
import { UpdateUserEmailCommand } from './update-user-email.command';
import { UserUpdateService } from '../../../../components/user';

export class UpdateUserEmailHandler implements CommandHandler<UpdateUserEmailCommand> {
  constructor(private readonly _service: UserUpdateService) {}

  async execute({ id, email }: UpdateUserEmailCommand) {
    await this._service.updateEmailById(id, email);
  }
}
