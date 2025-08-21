import { Provider } from '@nestjs/common';
import { JWTService } from '@api.mabell/jwt';
import { App, Domain } from '@api.mabell/core';
import { UserRefreshTokenDBModule } from '@api.mabell/db';
import { RandomIdService } from '@api.mabell/random-id';

export const userTokenCreateServiceProvider: Provider = {
  provide: App.Components.UserToken.UserTokenCreateService,
  useFactory: (
    wr: Domain.UserRefreshToken.UserRefreshTokenWriteRepository,
    idService: App.Ports.IdService,
    jwtService: App.Ports.JWTService,
  ) => {
    return new App.Components.UserToken.UserTokenCreateService(wr, idService, jwtService);
  },
  inject: [UserRefreshTokenDBModule.UserRefreshTokenWriteRepository, RandomIdService, JWTService],
};
