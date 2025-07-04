import { CommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { LoginAdminCommand } from '@core/app/cqrs/admin/commands/login-admin/login-admin.command';
import { LoginAdminHandler as CoreLoginAdminHandler } from '@core/app/cqrs/admin/commands/login-admin/login-admin.handler';
import { LoginService } from '@core/app/components/login/login.service';

@CommandHandler(LoginAdminCommand)
export class LoginAdminHandler extends CoreLoginAdminHandler {
  constructor(@Inject(LoginService) loginService: LoginService) {
    super(loginService);
  }
}
