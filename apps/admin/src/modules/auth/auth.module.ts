import { Module } from '@nestjs/common';
import { PasswordModule, PasswordService } from '@infrastructure/password';
import { JWTModule, JWTService } from '@infrastructure/jwt';
import { LoginService } from '@core/app/components/login/login.service';
import { AdminService } from '@core/app/components/admin/admin.service';
import { AdminTokenService } from '@core/app/components/admin-token/admin-token.service';
import { EventBus } from '@infrastructure/event-bus';
import { AdminReadRepository as AdminReadRepositoryPort } from '@core/domain/components/admin/repository/admin-read-repository.port';
import { UserReadRepository as UserReadRepositoryPort } from '@core/domain/components/user/repository/user-read-repository.port';
import { PasswordService as PasswordServicePort } from '@core/app/common/ports/password-service.port';
import { AdminReadRepository } from '@infrastructure/mongoose/services/admin/admin-read-repository.service';
import { UserReadRepository } from '@infrastructure/mongoose/services/user/user-read-repository.service';
import { EventBus as EventBusPort } from '@core/app/common/ports/event-bus.port';
import { AdminWriteRepository as AdminWriteRepositoryPort } from '@core/domain/components/admin/repository/admin-write-repository.port';
import { IdService as IdServicePort } from '@core/app/common/ports/id.service.port';
import { AdminId } from '@core/domain/components/admin/types';
import { AdminWriteRepository } from '@infrastructure/mongoose/services/admin/admin-write-repository.service';
import { RandomIdModule, RandomIdService } from '@infrastructure/random-id';
import { AdminRefreshTokenReadRepository as AdminRefreshTokenReadRepositoryPort } from '@core/domain/components/admin-refresh-token/repository/admin-refresh-token-read-repository.port';
import { AdminRefreshTokenWriteRepository as AdminRefreshTokenWriteRepositoryPort } from '@core/domain/components/admin-refresh-token/repository/admin-refresh-token-write-repository.port';
import { JWTService as JWTServicePort } from '@core/app/common/ports/jwt.service.port';
import { AdminRefreshTokenId } from '@core/domain/components/admin-refresh-token/types';
import { AdminRefreshTokenReadRepository } from '@infrastructure/mongoose/services/admin-refresh-token/admin-refresh-token-read-repository.service';
import { AdminRefreshTokenWriteRepository } from '@infrastructure/mongoose/services/admin-refresh-token/admin-refresh-token-write-repository.service';
import { AuthController } from './auth.controller';
import { LoginAdminHandler } from './commands/login-admin.handler';
import { CreateAdminAccessTokenHandler } from './commands/create-admin-access-token.handler';
import { CreateAdminRefreshTokenHandler } from './commands/create-admin-refresh-token.handler';
import { ValidateAdminRefreshTokenHandler } from './queries/validate-admin-refresh-token.handler';
import { DeleteAdminRefreshTokenHandler } from './commands/delete-admin-refresh-token.handler';

@Module({
  imports: [PasswordModule, RandomIdModule, JWTModule],
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
      provide: AdminService,
      useFactory: (
        eb: EventBusPort,
        wr: AdminWriteRepositoryPort,
        rr: AdminReadRepositoryPort,
        idService: IdServicePort<AdminId>,
        passwordService: PasswordServicePort,
      ) => {
        return new AdminService(eb, wr, rr, idService, passwordService);
      },
      inject: [
        EventBus,
        AdminWriteRepository,
        AdminReadRepository,
        RandomIdService,
        PasswordService,
      ],
    },
    {
      provide: AdminTokenService,
      useFactory: (
        wr: AdminRefreshTokenWriteRepositoryPort,
        rr: AdminRefreshTokenReadRepositoryPort,
        idService: IdServicePort<AdminRefreshTokenId>,
        jwtService: JWTServicePort,
      ) => {
        return new AdminTokenService(wr, rr, idService, jwtService);
      },
      inject: [
        AdminRefreshTokenWriteRepository,
        AdminRefreshTokenReadRepository,
        RandomIdService,
        JWTService,
      ],
    },
    LoginAdminHandler,
    CreateAdminAccessTokenHandler,
    CreateAdminRefreshTokenHandler,
    DeleteAdminRefreshTokenHandler,
    ValidateAdminRefreshTokenHandler,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
