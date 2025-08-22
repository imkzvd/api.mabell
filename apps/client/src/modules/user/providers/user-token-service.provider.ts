import { Provider } from '@nestjs/common';
import { App } from '@api.mabell/core';
import { UserRefreshTokenDBModule } from '@api.mabell/db';

export const userTokenServiceProvider: Provider = {
  provide: App.Components.UserToken.UserTokenService,
  useFactory: (rr) => {
    return new App.Components.UserToken.UserTokenService(rr);
  },
  inject: [UserRefreshTokenDBModule.UserRefreshTokenReadRepository],
};
