import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UserService } from '@core/app/components/user/user.service';
import { UpdateUserCommand } from '@core/app/cqrs/user/commands/update-user/update-user.command';
import { UpdateUserHandler as CoreUpdateUserHandler } from '@core/app/cqrs/user/commands/update-user/update-user.handler';

@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements ICommandHandler<UpdateUserCommand> {
  private readonly _coreHandler: CoreUpdateUserHandler;

  constructor(@Inject(UserService) service: UserService) {
    this._coreHandler = new CoreUpdateUserHandler(service);
  }

  execute(command: UpdateUserCommand) {
    return this._coreHandler.execute(command);
  }
}
