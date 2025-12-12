import { Provider } from '@nestjs/common';
import { App } from '@api.mabell/core';
import { UserDBModule } from '@api.mabell/db';
import { PasswordService } from '@api.mabell/password';
import { EventBus } from '@api.mabell/event-bus';
import { RandomIdService } from '@api.mabell/random-id';

export const userRegistrationServiceProvider: Provider = {
  provide: App.Components.User.UserRegistrationService,
  useFactory: (eb, wr, idService, passwordService) => {
    return new App.Components.User.UserRegistrationService(eb, wr, idService, passwordService);
  },
  inject: [EventBus, UserDBModule.UserWriteRepository, RandomIdService, PasswordService],
};
