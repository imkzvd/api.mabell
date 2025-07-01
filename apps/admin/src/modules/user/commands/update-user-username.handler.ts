import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UserService } from '@core/app/components/user/user.service';
import { UpdateUserUsernameCommand } from '@core/app/cqrs/user/commands/update-user-username/update-user-username.command';
import { UpdateUserUsernameHandler as CoreUpdateUserUsernameHandler } from '@core/app/cqrs/user/commands/update-user-username/update-user-username.handler';

@CommandHandler(UpdateUserUsernameCommand)
export class UpdateUserUsernameHandler implements ICommandHandler<UpdateUserUsernameCommand> {
  private readonly _coreHandler: CoreUpdateUserUsernameHandler;

  constructor(@Inject(UserService) service: UserService) {
    this._coreHandler = new CoreUpdateUserUsernameHandler(service);
  }

  execute(command: UpdateUserUsernameCommand) {
    return this._coreHandler.execute(command);
  }
}
