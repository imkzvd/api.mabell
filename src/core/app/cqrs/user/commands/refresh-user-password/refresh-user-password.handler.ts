import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { RefreshUserPasswordCommand } from './refresh-user-password.command';
import { UserService } from '../../../../components/user/user.service';

@CommandHandler(RefreshUserPasswordCommand)
export class RefreshUserPasswordHandler implements ICommandHandler<RefreshUserPasswordCommand> {
  constructor(@Inject(UserService) private readonly _userService: UserService) {}

  async execute({ id }: RefreshUserPasswordCommand) {
    return await this._userService.refreshUserPassword(id);
  }
}
