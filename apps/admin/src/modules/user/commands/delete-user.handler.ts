import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { DeleteUserCommand } from '@core/app/cqrs/user/commands/delete-user/delete-user.command';
import { DeleteUserHandler as CoreDeleteUserHandler } from '@core/app/cqrs/user/commands/delete-user/delete-user.handler';
import { UserService } from '@core/app/components/user/user.service';

@CommandHandler(DeleteUserCommand)
export class DeleteUserHandler implements ICommandHandler<DeleteUserCommand> {
  private readonly _coreHandler: CoreDeleteUserHandler;

  constructor(@Inject(UserService) service: UserService) {
    this._coreHandler = new CoreDeleteUserHandler(service);
  }

  execute(command: DeleteUserCommand) {
    return this._coreHandler.execute(command);
  }
}
