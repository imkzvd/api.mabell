import { Provider } from '@nestjs/common';
import { AdminRefreshTokenWriteRepository as AdminRefreshTokenWriteRepositoryPort } from '@core/domain/components/admin-refresh-token/repository/admin-refresh-token-write-repository.port';
import { JWTService as JWTServicePort } from '@core/app/common/ports/jwt.service.port';
import { AdminRefreshTokenWriteRepository } from '@infrastructure/mongoose/services/admin-refresh-token/admin-refresh-token-write-repository.service';
import { JWTService } from '@infrastructure/jwt';
import { AdminTokenDeleteService } from '@core/app/components/admin-token/services/admin-token-delete.service';

export const adminTokenDeleteServiceProvider: Provider = {
  provide: AdminTokenDeleteService,
  useFactory: (wr: AdminRefreshTokenWriteRepositoryPort, jwtService: JWTServicePort) => {
    return new AdminTokenDeleteService(wr, jwtService);
  },
  inject: [AdminRefreshTokenWriteRepository, JWTService],
};
