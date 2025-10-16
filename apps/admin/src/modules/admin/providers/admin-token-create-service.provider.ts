import { Provider } from '@nestjs/common';
import { JWTService } from '@api.mabell/jwt';
import { App, Domain } from '@api.mabell/core';
import { AdminRefreshTokenDBModule } from '@api.mabell/db';
import { RandomIdService } from '@api.mabell/random-id';

export const adminTokenCreateServiceProvider: Provider = {
  provide: App.Components.AdminToken.AdminTokenCreateService,
  useFactory: (
    wr: Domain.AdminRefreshToken.AdminRefreshTokenWriteRepository,
    idService: App.Ports.IdService,
    jwtService: App.Ports.JWTService,
  ) => {
    return new App.Components.AdminToken.AdminTokenCreateService(wr, idService, jwtService);
  },
  inject: [AdminRefreshTokenDBModule.AdminRefreshTokenWriteRepository, RandomIdService, JWTService],
};
