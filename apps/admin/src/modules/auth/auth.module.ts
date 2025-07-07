import { Module } from '@nestjs/common';
import { PasswordModule } from '@infrastructure/password';
import { JWTModule, JWTService } from '@infrastructure/jwt';
import { AdminTokenService } from '@core/app/components/admin-token/admin-token.service';
import { IdService as IdServicePort } from '@core/app/common/ports/id.service.port';
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
import { loginServiceProvider } from './providers/login-service.provider';
import { adminServiceProvider } from '../admin/providers/admin-service.provider';

@Module({
  imports: [PasswordModule, RandomIdModule, JWTModule],
  providers: [
    loginServiceProvider,
    adminServiceProvider,
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
