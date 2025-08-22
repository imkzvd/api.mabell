import { Provider } from '@nestjs/common';
import { App } from '@api.mabell/core';
import { AdminRefreshTokenDBModule } from '@api.mabell/db';

export const adminTokenServiceProvider: Provider = {
  provide: App.Components.AdminToken.AdminTokenService,
  useFactory: (rr: App.Ports.AdminRefreshTokenReadRepository) => {
    return new App.Components.AdminToken.AdminTokenService(rr);
  },
  inject: [AdminRefreshTokenDBModule.AdminRefreshTokenReadRepository],
};
