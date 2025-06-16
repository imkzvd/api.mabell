import { Module } from '@nestjs/common';
import { LoginController } from './login.controller';
import { LoginService } from '../../../../../core/app/components/login/login.service';
import { PasswordModule } from '../../../../../infrastructure/security/password/password.module';
import { LoginUserHandler } from '../../../../../core/app/cqrs/user/commands/login-user/login-user.handler';

@Module({
  imports: [PasswordModule],
  providers: [LoginService, LoginUserHandler],
  controllers: [LoginController],
})
export class LoginModule {}
