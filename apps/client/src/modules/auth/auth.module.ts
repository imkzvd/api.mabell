import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { LoginService } from '../../../../../core/app/components/login/login.service';
import { PasswordModule } from '../../../../../infrastructure/security/password/password.module';
import { AdminTokenService } from '../../../../../core/app/components/admin-token/admin-token.service';
import { JWTModule } from '../../../../../infrastructure/security/jwt/jwt.module';
import { LoginUserHandler } from '../../../../../core/app/cqrs/user/commands/login-user/login-user.handler';
import { CreateUserAccessTokenHandler } from '../../../../../core/app/cqrs/token/commands/create-user-access-token/create-user-access-token.handler';
import { UserService } from '../../../../../core/app/components/user/user.service';

@Module({
  imports: [PasswordModule, JWTModule],
  providers: [
    LoginService,
    UserService,
    AdminTokenService,
    LoginUserHandler,
    CreateUserAccessTokenHandler,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
