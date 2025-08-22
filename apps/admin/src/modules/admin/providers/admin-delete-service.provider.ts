import { Provider } from '@nestjs/common';
import { App, Domain } from '@api.mabell/core';
import { EventBus } from '@api.mabell/event-bus';
import { AdminDBModule } from '@api.mabell/db';

export const adminDeleteServiceProvider: Provider = {
  provide: App.Components.Admin.AdminDeleteService,
  useFactory: (eb: App.Ports.EventBus, wr: Domain.Admin.AdminWriteRepository) =>
    new App.Components.Admin.AdminDeleteService(eb, wr),
  inject: [EventBus, AdminDBModule.AdminWriteRepository],
};
