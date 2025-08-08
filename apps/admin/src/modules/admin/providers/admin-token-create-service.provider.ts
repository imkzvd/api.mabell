import { Provider } from '@nestjs/common';
import { AdminTokenCreateService } from '@core/app/components/admin-token/services/admin-token-create.service';
import { AdminRefreshTokenWriteRepository as AdminRefreshTokenWriteRepositoryPort } from '@core/domain/components/admin-refresh-token/repository/admin-refresh-token-write-repository.port';
import { IdService as IdServicePort } from '@core/app/common/ports/id.service.port';
import { AdminRefreshTokenId } from '@core/domain/components/admin-refresh-token/types';
import { JWTService as JWTServicePort } from '@core/app/common/ports/jwt.service.port';
import { AdminRefreshTokenWriteRepository } from '@infrastructure/mongoose/services/admin-refresh-token/admin-refresh-token-write-repository.service';
import { RandomIdService } from '@infrastructure/random-id';
import { JWTService } from '@api.mabell/jwt';
import { ConfigService } from '@nestjs/config';

export const adminTokenCreateServiceProvider: Provider = {
  provide: AdminTokenCreateService,
  useFactory: (
    wr: AdminRefreshTokenWriteRepositoryPort,
    idService: IdServicePort<AdminRefreshTokenId>,
    jwtService: JWTServicePort,
    configService: ConfigService,
  ) => {
    return new AdminTokenCreateService(wr, idService, jwtService, configService);
  },
  inject: [AdminRefreshTokenWriteRepository, RandomIdService, JWTService, ConfigService],
};
