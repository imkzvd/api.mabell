import { Provider } from '@nestjs/common';
import { App } from '@api.mabell/core';
import { UserDBModule } from '@api.mabell/db';

export const userVerificationServiceProvider: Provider = {
  provide: App.Components.User.UserVerifyService,
  useFactory: (wr) => new App.Components.User.UserVerifyService(wr),
  inject: [UserDBModule.UserWriteRepository],
};
