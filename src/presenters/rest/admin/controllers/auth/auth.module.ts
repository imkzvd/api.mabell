import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { LoginAdminHandler } from '../../../../../core/app/cqrs/admin/commands/login-admin/login-admin.handler';
import { LoginService } from '../../../../../core/app/components/login/login.service';
import { PasswordModule } from '../../../../../infrastructure/security/password/password.module';
import { CreateAdminAccessTokenHandler } from '../../../../../core/app/cqrs/token/commands/create-admin-access-token/create-admin-access-token.handler';
import { AdminTokenService } from '../../../../../core/app/components/admin-token/admin-token.service';
import { JWTModule } from '../../../../../infrastructure/security/jwt/jwt.module';
import { AdminService } from '../../../../../core/app/components/admin/admin.service';
import { CreateAdminRefreshTokenHandler } from '../../../../../core/app/cqrs/token/commands/create-admin-refresh-token/create-admin-refresh-token.handler';
import { AdminTokenEventSubscriber } from '../../../../../core/app/components/admin-token/admin-token.event-subscriber';
import { ValidateAdminRefreshTokenHandler } from '../../../../../core/app/cqrs/token/queries/validate-admin-refresh-token/validate-admin-refresh-token.handler';

@Module({
  imports: [PasswordModule, JWTModule],
  providers: [
    LoginService,
    AdminService,
    AdminTokenService,
    LoginAdminHandler,
    CreateAdminAccessTokenHandler,
    CreateAdminRefreshTokenHandler,
    AdminTokenEventSubscriber,
    ValidateAdminRefreshTokenHandler,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
