import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { DeleteUserCommand } from './delete-user.command';
import { UserService } from '../../../../components/user/user.service';

@CommandHandler(DeleteUserCommand)
export class DeleteUserHandler implements ICommandHandler<DeleteUserCommand> {
  constructor(@Inject(UserService) private readonly _userService: UserService) {}

  async execute({ id }: DeleteUserCommand) {
    return await this._userService.deleteUser(id);
  }
}
