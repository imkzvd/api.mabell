import { Module } from '@nestjs/common';
import { PasswordModule } from '@infrastructure/password';
import { IdService as IdServicePort } from '@core/app/common/ports/id.service.port';
import { RandomIdModule, RandomIdService } from '@infrastructure/random-id';
import { FileStorageModule } from '@infrastructure/file-storage';
import { JWTService as JWTServicePort } from '@core/app/common/ports/jwt.service.port';
import { JWTModule, JWTService } from '@infrastructure/jwt';
import { UserTokenService } from '@core/app/components/user-token/user-token.service';
import { UserRefreshTokenWriteRepository as UserRefreshTokenWriteRepositoryPort } from '@core/domain/components/user-refresh-token/user-refresh-token-write-repository.port';
import { UserRefreshTokenReadRepository as UserRefreshTokenReadRepositoryPort } from '@core/domain/components/user-refresh-token/user-refresh-token-read-repository.port';
import { UserRefreshTokenId } from '@core/domain/components/user-refresh-token/types';
import { UserRefreshTokenWriteRepository } from '@infrastructure/mongoose/services/user-refresh-token/user-refresh-token-write-repository.service';
import { UserRefreshTokenReadRepository } from '@infrastructure/mongoose/services/user-refresh-token/user-refresh-token-read-repository.service';
import { AuthController } from './auth.controller';
import { LoginUserHandler } from './commands/login-user.handler';
import { CreateUserAccessTokenHandler } from './commands/create-user-access-token.handler';
import { CreateUserRefreshTokenHandler } from './commands/create-user-refresh-token.handler';
import { loginServiceProvider } from '../../providers/login-service.provider';
import { userServiceProvider } from '../../providers/user-service.provider';

@Module({
  imports: [PasswordModule, JWTModule, RandomIdModule, FileStorageModule],
  providers: [
    loginServiceProvider,
    userServiceProvider,
    {
      provide: UserTokenService,
      useFactory: (
        wr: UserRefreshTokenWriteRepositoryPort,
        rr: UserRefreshTokenReadRepositoryPort,
        idService: IdServicePort<UserRefreshTokenId>,
        jwtService: JWTServicePort,
      ) => {
        return new UserTokenService(wr, rr, idService, jwtService);
      },
      inject: [
        UserRefreshTokenWriteRepository,
        UserRefreshTokenReadRepository,
        RandomIdService,
        JWTService,
      ],
    },
    LoginUserHandler,
    CreateUserAccessTokenHandler,
    CreateUserRefreshTokenHandler,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
