import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { LoginAdminCommand } from './login-admin.command';
import { LoginService } from '../../../../components/login/login.service';

@CommandHandler(LoginAdminCommand)
export class LoginAdminHandler implements ICommandHandler<LoginAdminCommand> {
  constructor(@Inject(LoginService) private readonly _loginService: LoginService) {}

  async execute({ payload }: LoginAdminCommand) {
    return await this._loginService.loginAdmin(payload);
  }
}
