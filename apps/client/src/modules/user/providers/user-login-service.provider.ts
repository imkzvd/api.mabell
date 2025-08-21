import { Provider } from '@nestjs/common';
import { App } from '@api.mabell/core';
import { UserDBModule } from '@api.mabell/db';
import { PasswordService } from '@api.mabell/password';

export const userLoginServiceProvider: Provider = {
  provide: App.Components.User.UserLoginService,
  useFactory: (userRR, passwordService) => {
    return new App.Components.User.UserLoginService(userRR, passwordService);
  },
  inject: [UserDBModule.UserReadRepository, PasswordService],
};
