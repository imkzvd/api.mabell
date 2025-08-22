import { Provider } from '@nestjs/common';
import { App } from '@api.mabell/core';
import { UserDBModule } from '@api.mabell/db';

export const userFindServiceProvider: Provider = {
  provide: App.Components.User.UserService,
  useFactory: (rr) => new App.Components.User.UserService(rr),
  inject: [UserDBModule.UserReadRepository],
};
