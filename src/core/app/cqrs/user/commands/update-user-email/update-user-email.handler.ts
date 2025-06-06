import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';

import { UpdateUserEmailCommand } from './update-user-email.command';
import { UserService } from '../../../../components/user/user.service';

@CommandHandler(UpdateUserEmailCommand)
export class UpdateUserEmailHandler implements ICommandHandler<UpdateUserEmailCommand> {
  constructor(@Inject(UserService) private readonly _userService: UserService) {}

  async execute({ id, email }: UpdateUserEmailCommand) {
    return await this._userService.updateUserEmail(id, email);
  }
}
