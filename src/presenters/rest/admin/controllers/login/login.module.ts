import { Module } from '@nestjs/common';
import { LoginController } from './login.controller';
import { LoginAdminHandler } from '../../../../../core/app/cqrs/admin/commands/login-admin/login-admin.handler';
import { LoginService } from '../../../../../core/app/components/login/login.service';
import { PasswordModule } from '../../../../../infrastructure/security/password/password.module';
import { AdminService } from '../../../../../core/app/components/admin/admin.service';

@Module({
  imports: [PasswordModule],
  providers: [LoginService, AdminService, LoginAdminHandler],
  controllers: [LoginController],
})
export class LoginModule {}
