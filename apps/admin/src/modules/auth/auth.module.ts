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
import { loginServiceProvider } from '../../providers/login-service.provider';
import { adminServiceProvider } from '../../providers/admin-service.provider';
import { adminTokenServiceProvider } from '../../providers/admin-token-service.provider';

@Module({
  imports: [PasswordModule, RandomIdModule, JWTModule],
  providers: [
    loginServiceProvider,
    adminServiceProvider,
    adminTokenServiceProvider,
    LoginAdminHandler,
    CreateAdminAccessTokenHandler,
    CreateAdminRefreshTokenHandler,
    DeleteAdminRefreshTokenHandler,
    ValidateAdminRefreshTokenHandler,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
