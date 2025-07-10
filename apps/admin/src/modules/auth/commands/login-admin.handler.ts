import { CommandHandler } from '@nestjs/cqrs';
import { LoginAdminCommand } from '@core/app/cqrs/admin/commands/login-admin/login-admin.command';
import { LoginAdminHandler as CoreLoginAdminHandler } from '@core/app/cqrs/admin/commands/login-admin/login-admin.handler';
import { AdminLoginService } from '@core/app/components/admin/services/admin-login.service';

@CommandHandler(LoginAdminCommand)
export class LoginAdminHandler extends CoreLoginAdminHandler {
  constructor(service: AdminLoginService) {
    super(service);
  }
}
