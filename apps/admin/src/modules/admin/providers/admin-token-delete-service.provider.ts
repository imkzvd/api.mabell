import { Provider } from '@nestjs/common';
import { App, Domain } from '@api.mabell/core';
import { AdminRefreshTokenDBModule } from '@api.mabell/db';
import { JWTService } from '@api.mabell/jwt';

export const adminTokenDeleteServiceProvider: Provider = {
  provide: App.Components.AdminToken.AdminTokenDeleteService,
  useFactory: (
    wr: Domain.AdminRefreshToken.AdminRefreshTokenWriteRepository,
    jwtService: App.Ports.JWTService,
  ) => {
    return new App.Components.AdminToken.AdminTokenDeleteService(wr, jwtService);
  },
  inject: [AdminRefreshTokenDBModule.AdminRefreshTokenWriteRepository, JWTService],
};
