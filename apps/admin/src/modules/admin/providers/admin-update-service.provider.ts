import { Provider } from '@nestjs/common';
import { App } from '@api.mabell/core';
import { EventBus } from '@api.mabell/event-bus';
import { AdminDBModule } from '@api.mabell/db';
import { PasswordService } from '@api.mabell/password';

export const adminUpdateServiceProvider: Provider = {
  provide: App.Components.Admin.AdminUpdateService,
  useFactory: (eb, wr, passwordService) =>
    new App.Components.Admin.AdminUpdateService(eb, wr, passwordService),
  inject: [EventBus, AdminDBModule.AdminWriteRepository, PasswordService],
};
