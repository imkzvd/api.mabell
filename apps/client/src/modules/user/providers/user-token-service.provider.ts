import { Provider } from '@nestjs/common';
import { UserTokenService } from '@core/app/components/user-token/user-token.service';
import { UserRefreshTokenWriteRepository as UserRefreshTokenWriteRepositoryPort } from '@core/domain/components/user-refresh-token/user-refresh-token-write-repository.port';
import { UserRefreshTokenReadRepository as UserRefreshTokenReadRepositoryPort } from '@core/domain/components/user-refresh-token/user-refresh-token-read-repository.port';
import { IdService as IdServicePort } from '@core/app/common/ports/id.service.port';
import { UserRefreshTokenId } from '@core/domain/components/user-refresh-token/types';
import { JWTService as JWTServicePort } from '@core/app/common/ports/jwt.service.port';
import { UserRefreshTokenWriteRepository } from '@infrastructure/mongoose/services/user-refresh-token/user-refresh-token-write-repository.service';
import { UserRefreshTokenReadRepository } from '@infrastructure/mongoose/services/user-refresh-token/user-refresh-token-read-repository.service';
import { RandomIdService } from '@infrastructure/random-id';
import { JWTService } from '@infrastructure/jwt';

export const userTokenServiceProvider: Provider = {
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
};
