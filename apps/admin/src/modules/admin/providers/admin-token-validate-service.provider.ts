import { Provider } from '@nestjs/common';
import { App } from '@api.mabell/core';
import { JWTService } from '@api.mabell/jwt';
import { AdminRefreshTokenDBModule } from '@api.mabell/db';

export const adminTokenValidateServiceProvider: Provider = {
  provide: App.Components.AdminToken.AdminTokenValidateService,
  useFactory: (rr, jwtService) => {
    return new App.Components.AdminToken.AdminTokenValidateService(rr, jwtService);
  },
  inject: [AdminRefreshTokenDBModule.AdminRefreshTokenReadRepository, JWTService],
};
