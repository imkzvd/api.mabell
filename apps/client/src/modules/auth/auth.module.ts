import { Module } from '@nestjs/common';
import { PasswordModule } from '@infrastructure/password';
import { RandomIdModule } from '@infrastructure/random-id';
import { FileStorageModule } from '@infrastructure/file-storage';
import { JWTModule } from '@infrastructure/jwt';
import { AuthController } from './auth.controller';
import { LoginUserHandler } from './commands/login-user.handler';
import { CreateUserAccessTokenHandler } from './commands/create-user-access-token.handler';
import { CreateUserRefreshTokenHandler } from './commands/create-user-refresh-token.handler';
import { userLoginServiceProvider } from '../user/providers/user-login-service.provider';
import { userServiceProvider } from '../user/providers/user-service.provider';
import { userTokenServiceProvider } from '../user/providers/user-token-service.provider';

@Module({
  imports: [PasswordModule, JWTModule, RandomIdModule, FileStorageModule],
  providers: [
    userLoginServiceProvider,
    userServiceProvider,
    userTokenServiceProvider,
    LoginUserHandler,
    CreateUserAccessTokenHandler,
    CreateUserRefreshTokenHandler,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
