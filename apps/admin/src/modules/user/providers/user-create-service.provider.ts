import { Provider } from '@nestjs/common';
import { App } from '@api.mabell/core';
import { EventBus } from '@api.mabell/event-bus';
import { UserDBModule } from '@api.mabell/db';
import { RandomIdService } from '@api.mabell/random-id';
import { PasswordService } from '@api.mabell/password';

export const userCreateServiceProvider: Provider = {
  provide: App.Components.User.UserCreateService,
  useFactory: (eb, wr, idService, passwordService) =>
    new App.Components.User.UserCreateService(eb, wr, idService, passwordService),
  inject: [EventBus, UserDBModule.UserWriteRepository, RandomIdService, PasswordService],
};
