import { Provider } from '@nestjs/common';
import { JWTService as JWTServicePort } from '@core/app/common/ports/jwt.service.port';
import { JWTService } from '@api.mabell/jwt';
import { AdminTokenValidateService } from '@core/app/components/admin-token/services/admin-token-validate.service';
import { AdminRefreshTokenReadRepository as AdminRefreshTokenReadRepositoryPort } from '@core/domain/components/admin-refresh-token/repository/admin-refresh-token-read-repository.port';
import { AdminRefreshTokenReadRepository } from '@infrastructure/mongoose/services/admin-refresh-token/admin-refresh-token-read-repository.service';

export const adminTokenValidateServiceProvider: Provider = {
  provide: AdminTokenValidateService,
  useFactory: (rr: AdminRefreshTokenReadRepositoryPort, jwtService: JWTServicePort) => {
    return new AdminTokenValidateService(rr, jwtService);
  },
  inject: [AdminRefreshTokenReadRepository, JWTService],
};
