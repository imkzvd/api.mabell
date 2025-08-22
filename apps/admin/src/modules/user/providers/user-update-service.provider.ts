import { Provider } from '@nestjs/common';
import { App } from '@api.mabell/core';
import { EventBus } from '@api.mabell/event-bus';
import { UserDBModule } from '@api.mabell/db';
import { TmpFileStorage, UserFileStorage } from '@api.mabell/file-storage';
import { PasswordService } from '@api.mabell/password';

export const userUpdateServiceProvider: Provider = {
  provide: App.Components.User.UserUpdateService,
  useFactory: (eb, wr, passwordService, tmpFS, userFS) =>
    new App.Components.User.UserUpdateService(eb, wr, passwordService, tmpFS, userFS),
  inject: [
    EventBus,
    UserDBModule.UserWriteRepository,
    PasswordService,
    TmpFileStorage,
    UserFileStorage,
  ],
};
