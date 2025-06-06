import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UpdateUserCommand } from './update-user.command';
import { UserService } from '../../../../components/user/user.service';

@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements ICommandHandler<UpdateUserCommand> {
  constructor(@Inject(UserService) private readonly _userService: UserService) {}

  async execute({ id, payload }: UpdateUserCommand) {
    return await this._userService.updateUser(id, payload);
  }
}
