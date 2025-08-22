import { Provider } from '@nestjs/common';
import { App } from '@api.mabell/core';
import { AdminDBModule } from '@api.mabell/db';

export const adminServiceProvider: Provider = {
  provide: App.Components.Admin.AdminService,
  useFactory: (rr: App.Ports.AdminReadRepository) => new App.Components.Admin.AdminService(rr),
  inject: [AdminDBModule.AdminReadRepository],
};
