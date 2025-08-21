import { Provider } from '@nestjs/common';
import { App } from '@api.mabell/core';
import { AdminDBModule } from '@api.mabell/db';
import { PasswordService } from '@api.mabell/password';

export const adminLoginServiceProvider: Provider = {
  provide: App.Components.Admin.AdminLoginService,
  useFactory: (rr: App.Ports.AdminReadRepository, passwordService: App.Ports.PasswordService) => {
    return new App.Components.Admin.AdminLoginService(rr, passwordService);
  },
  inject: [AdminDBModule.AdminReadRepository, PasswordService],
};
