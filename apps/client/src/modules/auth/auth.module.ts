import { Module } from '@nestjs/common';
import { LoginService } from '@core/app/components/login/login.service';
import { AdminReadRepository as AdminReadRepositoryPort } from '@core/domain/components/admin/repository/admin-read-repository.port';
import { UserReadRepository as UserReadRepositoryPort } from '@core/domain/components/user/repository/user-read-repository.port';
import { PasswordService as PasswordServicePort } from '@core/app/common/ports/password-service.port';
import { AdminReadRepository } from '@infrastructure/mongoose/services/admin/admin-read-repository.service';
import { UserReadRepository } from '@infrastructure/mongoose/services/user/user-read-repository.service';
import { PasswordModule, PasswordService } from '@infrastructure/password';
import { UserService } from '@core/app/components/user/user.service';
import { EventBus as EventBusPort } from '@core/app/common/ports/event-bus.port';
import { UserWriteRepository as UserWriteRepositoryPort } from '@core/domain/components/user/repository/user-write-repository.port';
import { IdService as IdServicePort } from '@core/app/common/ports/id.service.port';
import { UserId } from '@core/domain/components/user/types';
import { TmpFileStorage as TmpFileStoragePort } from '@core/app/common/ports/file-storages/tmp-file-storage.port';
import { UserFileStorage as UserFileStoragePort } from '@core/app/common/ports/file-storages/user-file-storage.port';
import { EventBus } from '@infrastructure/event-bus';
import { UserWriteRepository } from '@infrastructure/mongoose/services/user/user-write-repository.service';
import { RandomIdModule, RandomIdService } from '@infrastructure/random-id';
import { FileStorageModule, TmpFileStorage, UserFileStorage } from '@infrastructure/file-storage';
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

@Module({
  imports: [PasswordModule, JWTModule, RandomIdModule, FileStorageModule],
  providers: [
    {
      provide: LoginService,
      useFactory: (
        adminRR: AdminReadRepositoryPort,
        userRR: UserReadRepositoryPort,
        passwordService: PasswordServicePort,
      ) => {
        return new LoginService(adminRR, userRR, passwordService);
      },
      inject: [AdminReadRepository, UserReadRepository, PasswordService],
    },
    {
      provide: UserService,
      useFactory: (
        eb: EventBusPort,
        wr: UserWriteRepositoryPort,
        rr: UserReadRepositoryPort,
        idService: IdServicePort<UserId>,
        passwordService: PasswordServicePort,
        tmpFS: TmpFileStoragePort,
        userFS: UserFileStoragePort,
      ) => new UserService(eb, wr, rr, idService, passwordService, tmpFS, userFS),
      inject: [
        EventBus,
        UserWriteRepository,
        UserReadRepository,
        RandomIdService,
        PasswordService,
        TmpFileStorage,
        UserFileStorage,
      ],
    },
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
