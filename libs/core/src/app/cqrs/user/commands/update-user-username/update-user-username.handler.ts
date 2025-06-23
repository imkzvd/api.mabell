import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UpdateUserUsernameCommand } from './update-user-username.command';
import { UserService } from '../../../../components/user/user.service';

@CommandHandler(UpdateUserUsernameCommand)
export class UpdateUserUsernameHandler implements ICommandHandler<UpdateUserUsernameCommand> {
  constructor(@Inject(UserService) private readonly _userService: UserService) {}

  async execute({ id, username }: UpdateUserUsernameCommand) {
    return await this._userService.updateUserUsername(id, username);
  }
}
