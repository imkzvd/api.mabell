import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UserService } from '@core/app/components/user/user.service';
import { UpdateUserAvatarCommand } from '@core/app/cqrs/user/commands/update-user-avatar/update-user-avatar.command';
import { UpdateUserAvatarHandler as CoreUpdateUserAvatarHandler } from '@core/app/cqrs/user/commands/update-user-avatar/update-user-avatar.handler';

@CommandHandler(UpdateUserAvatarCommand)
export class UpdateUserAvatarHandler implements ICommandHandler<UpdateUserAvatarCommand> {
  private readonly _coreHandler: CoreUpdateUserAvatarHandler;

  constructor(@Inject(UserService) service: UserService) {
    this._coreHandler = new CoreUpdateUserAvatarHandler(service);
  }

  execute(command: UpdateUserAvatarCommand) {
    return this._coreHandler.execute(command);
  }
}
