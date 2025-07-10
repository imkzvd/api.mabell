import { Provider } from '@nestjs/common';
import { AdminRefreshTokenReadRepository as AdminRefreshTokenReadRepositoryPort } from '@core/domain/components/admin-refresh-token/repository/admin-refresh-token-read-repository.port';
import { AdminRefreshTokenReadRepository } from '@infrastructure/mongoose/services/admin-refresh-token/admin-refresh-token-read-repository.service';
import { AdminTokenService } from '@core/app/components/admin-token/services/admin-token.service';

export const adminTokenServiceProvider: Provider = {
  provide: AdminTokenService,
  useFactory: (rr: AdminRefreshTokenReadRepositoryPort) => {
    return new AdminTokenService(rr);
  },
  inject: [AdminRefreshTokenReadRepository],
};
