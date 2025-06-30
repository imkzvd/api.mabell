import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UserService } from '@core/app/components/user/user.service';
import { DeleteUserAvatarHandler as CoreDeleteUserAvatarHandler } from '@core/app/cqrs/user/commands/delete-user-avatar/delete-user-avatar.handler';
import { DeleteUserAvatarCommand } from '@core/app/cqrs/user/commands/delete-user-avatar/delete-user-avatar.command';

@CommandHandler(DeleteUserAvatarCommand)
export class DeleteUserAvatarHandler implements ICommandHandler<DeleteUserAvatarCommand> {
  private readonly _coreHandler: CoreDeleteUserAvatarHandler;

  constructor(@Inject(UserService) service: UserService) {
    this._coreHandler = new CoreDeleteUserAvatarHandler(service);
  }

  execute(command: DeleteUserAvatarCommand) {
    return this._coreHandler.execute(command);
  }
}
