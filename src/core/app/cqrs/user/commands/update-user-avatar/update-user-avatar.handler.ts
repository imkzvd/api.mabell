import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UpdateUserAvatarCommand } from './update-user-avatar.command';
import { UserService } from '../../../../components/user/user.service';

@CommandHandler(UpdateUserAvatarCommand)
export class UpdateUserAvatarHandler implements ICommandHandler<UpdateUserAvatarCommand> {
  constructor(@Inject(UserService) private readonly _userService: UserService) {}

  async execute({ id, payload }: UpdateUserAvatarCommand) {
    return await this._userService.updateUserAvatar(id, payload);
  }
}
