import { Provider } from '@nestjs/common';
import { App, Domain } from '@api.mabell/core';
import { EventBus } from '@api.mabell/event-bus';
import { AdminDBModule } from '@api.mabell/db';
import { RandomIdService } from '@api.mabell/random-id';
import { PasswordService } from '@api.mabell/password';

export const adminCreateServiceProvider: Provider = {
  provide: App.Components.Admin.AdminCreateService,
  useFactory: (
    eb: App.Ports.EventBus,
    wr: Domain.Admin.AdminWriteRepository,
    idService: App.Ports.IdService,
    passwordService: App.Ports.PasswordService,
  ) => new App.Components.Admin.AdminCreateService(eb, wr, idService, passwordService),
  inject: [EventBus, AdminDBModule.AdminWriteRepository, RandomIdService, PasswordService],
};
