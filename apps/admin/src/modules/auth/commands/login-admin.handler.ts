import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { LoginAdminCommand } from '@core/app/cqrs/admin/commands/login-admin/login-admin.command';
import { LoginAdminHandler as CoreLoginAdminHandler } from '@core/app/cqrs/admin/commands/login-admin/login-admin.handler';
import { LoginService } from '@core/app/components/login/login.service';

@CommandHandler(LoginAdminCommand)
export class LoginAdminHandler implements ICommandHandler<LoginAdminCommand> {
  private readonly _coreHandler: CoreLoginAdminHandler;

  constructor(@Inject(LoginService) loginService: LoginService) {
    this._coreHandler = new CoreLoginAdminHandler(loginService);
  }

  execute(command: LoginAdminCommand) {
    return this._coreHandler.execute(command);
  }
}
