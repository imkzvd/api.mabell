import { Provider } from '@nestjs/common';
import { AdminTokenService } from '@core/app/components/admin-token/admin-token.service';
import { AdminRefreshTokenWriteRepository as AdminRefreshTokenWriteRepositoryPort } from '@core/domain/components/admin-refresh-token/repository/admin-refresh-token-write-repository.port';
import { AdminRefreshTokenReadRepository as AdminRefreshTokenReadRepositoryPort } from '@core/domain/components/admin-refresh-token/repository/admin-refresh-token-read-repository.port';
import { IdService as IdServicePort } from '@core/app/common/ports/id.service.port';
import { AdminRefreshTokenId } from '@core/domain/components/admin-refresh-token/types';
import { JWTService as JWTServicePort } from '@core/app/common/ports/jwt.service.port';
import { AdminRefreshTokenWriteRepository } from '@infrastructure/mongoose/services/admin-refresh-token/admin-refresh-token-write-repository.service';
import { AdminRefreshTokenReadRepository } from '@infrastructure/mongoose/services/admin-refresh-token/admin-refresh-token-read-repository.service';
import { RandomIdService } from '@infrastructure/random-id';
import { JWTService } from '@infrastructure/jwt';

export const adminTokenServiceProvider: Provider = {
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
};
