import { Module } from '@nestjs/common';
import { PasswordModule } from '@infrastructure/password';
import { JWTModule } from '@infrastructure/jwt';
import { RandomIdModule } from '@infrastructure/random-id';
import { AuthController } from './auth.controller';
import { LoginAdminHandler } from './commands/login-admin.handler';
import { CreateAdminAccessTokenHandler } from './commands/create-admin-access-token.handler';
import { CreateAdminRefreshTokenHandler } from './commands/create-admin-refresh-token.handler';
import { ValidateAdminRefreshTokenHandler } from './queries/validate-admin-refresh-token.handler';
import { DeleteAdminRefreshTokenHandler } from './commands/delete-admin-refresh-token.handler';
import { adminLoginServiceProvider } from '../admin/providers/admin-login-service.provider';
import { adminServiceProvider } from '../admin/providers/admin-service.provider';
import { adminTokenCreateServiceProvider } from '../admin/providers/admin-token-create-service.provider';
import { adminTokenDeleteServiceProvider } from '../admin/providers/admin-token-delete-service.provider';
import { adminTokenValidateServiceProvider } from '../admin/providers/admin-token-validate-service.provider';

@Module({
  imports: [PasswordModule, RandomIdModule, JWTModule],
  providers: [
    adminLoginServiceProvider,
    adminServiceProvider,
    adminTokenCreateServiceProvider,
    adminTokenDeleteServiceProvider,
    adminTokenValidateServiceProvider,
    LoginAdminHandler,
    CreateAdminAccessTokenHandler,
    CreateAdminRefreshTokenHandler,
    DeleteAdminRefreshTokenHandler,
    ValidateAdminRefreshTokenHandler,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
