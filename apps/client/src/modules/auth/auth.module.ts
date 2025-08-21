import { Module } from '@nestjs/common';
import { PasswordModule } from '@api.mabell/password';
import { RandomIdModule } from '@api.mabell/random-id';
import { FileStorageModule } from '@api.mabell/file-storage';
import { JWTModule } from '@api.mabell/jwt';
import { AuthController } from './auth.controller';
import { LoginUserHandler } from './commands/login-user.handler';
import { CreateUserAccessTokenHandler } from './commands/create-user-access-token.handler';
import { CreateUserRefreshTokenHandler } from './commands/create-user-refresh-token.handler';
import { userLoginServiceProvider } from '../user/providers/user-login-service.provider';
import { userServiceProvider } from '../user/providers/user-service.provider';
import { userTokenServiceProvider } from '../user/providers/user-token-service.provider';
import { userTokenCreateServiceProvider } from '../user/providers/user-token-create-service.provider';

@Module({
  imports: [PasswordModule, JWTModule, RandomIdModule, FileStorageModule],
  providers: [
    userLoginServiceProvider,
    userServiceProvider,
    userTokenServiceProvider,
    userTokenCreateServiceProvider,
    LoginUserHandler,
    CreateUserAccessTokenHandler,
    CreateUserRefreshTokenHandler,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
