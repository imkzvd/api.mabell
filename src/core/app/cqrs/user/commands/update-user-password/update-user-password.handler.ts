import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UpdateUserPasswordCommand } from './update-user-password.command';
import { UserService } from '../../../../components/user/user.service';

@CommandHandler(UpdateUserPasswordCommand)
export class UpdateUserPasswordHandler implements ICommandHandler<UpdateUserPasswordCommand> {
  constructor(@Inject(UserService) private readonly _userService: UserService) {}

  async execute({ id, payload }: UpdateUserPasswordCommand) {
    return await this._userService.updateUserPassword(id, payload);
  }
}
