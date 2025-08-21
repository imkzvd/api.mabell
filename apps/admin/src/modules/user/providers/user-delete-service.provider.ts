import { Provider } from '@nestjs/common';
import { App } from '@api.mabell/core';
import { EventBus } from '@api.mabell/event-bus';
import { UserDBModule } from '@api.mabell/db';
import { UserFileStorage } from '@api.mabell/file-storage';

export const userDeleteServiceProvider: Provider = {
  provide: App.Components.User.UserDeleteService,
  useFactory: (eb, wr, userFS) => new App.Components.User.UserDeleteService(eb, wr, userFS),
  inject: [EventBus, UserDBModule.UserWriteRepository, UserFileStorage],
};
