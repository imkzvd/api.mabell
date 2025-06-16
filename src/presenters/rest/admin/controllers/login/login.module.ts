import { Module } from '@nestjs/common';
import { LoginController } from './login.controller';
import { LoginAdminHandler } from '../../../../../core/app/cqrs/admin/commands/login-admin/login-admin.handler';
import { LoginService } from '../../../../../core/app/components/login/login.service';
import { PasswordModule } from '../../../../../infrastructure/security/password/password.module';
import { CreateAdminAccessTokenHandler } from '../../../../../core/app/cqrs/token/commands/create-admin-access-token/create-admin-access-token.handler';
import { TokenService } from '../../../../../core/app/components/token/token.service';
import { JWTModule } from '../../../../../infrastructure/security/jwt/jwt.module';
import { AdminService } from '../../../../../core/app/components/admin/admin.service';
import { CreateAdminRefreshTokenHandler } from '../../../../../core/app/cqrs/token/commands/create-admin-refresh-token/create-admin-refresh-token.handler';
import { TokenEventSubscriber } from '../../../../../core/app/components/token/token.event-subscriber';

@Module({
  imports: [PasswordModule, JWTModule],
  providers: [
    LoginService,
    AdminService,
    TokenService,
    LoginAdminHandler,
    CreateAdminAccessTokenHandler,
    CreateAdminRefreshTokenHandler,
    TokenEventSubscriber,
  ],
  controllers: [LoginController],
})
export class LoginModule {}
