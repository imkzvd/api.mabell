import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { DeleteUserAvatarCommand } from './delete-user-avatar.command';
import { UserService } from '../../../../components/user/user.service';

@CommandHandler(DeleteUserAvatarCommand)
export class DeleteUserAvatarHandler implements ICommandHandler<DeleteUserAvatarCommand> {
  constructor(@Inject(UserService) private readonly _userService: UserService) {}

  async execute({ id }: DeleteUserAvatarCommand) {
    return await this._userService.deleteUserAvatar(id);
  }
}
