import { Provider } from '@nestjs/common';
import { UserRefreshTokenReadRepository as UserRefreshTokenReadRepositoryPort } from '@core/domain/components/user-refresh-token/user-refresh-token-read-repository.port';
import { UserRefreshTokenReadRepository } from '@infrastructure/mongoose/services/user-refresh-token/user-refresh-token-read-repository.service';
import { UserTokenService } from '@core/app/components/user-token/services/user-token.service';

export const userTokenServiceProvider: Provider = {
  provide: UserTokenService,
  useFactory: (rr: UserRefreshTokenReadRepositoryPort) => {
    return new UserTokenService(rr);
  },
  inject: [UserRefreshTokenReadRepository],
};
