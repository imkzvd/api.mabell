import { Provider } from '@nestjs/common';
import { EventBus as EventBusPort } from '@core/app/common/ports/event-bus.port';
import { AdminWriteRepository as AdminWriteRepositoryPort } from '@core/domain/components/admin/repository/admin-write-repository.port';
import { PasswordService as PasswordServicePort } from '@core/app/common/ports/password-service.port';
import { EventBus } from '@infrastructure/event-bus';
import { AdminWriteRepository } from '@infrastructure/mongoose/services/admin/admin-write-repository.service';
import { PasswordService } from '@infrastructure/password';
import { AdminUpdateService } from '@core/app/components/admin/services/admin-update.service';

export const adminUpdateServiceProvider: Provider = {
  provide: AdminUpdateService,
  useFactory: (
    eb: EventBusPort,
    wr: AdminWriteRepositoryPort,
    passwordService: PasswordServicePort,
  ) => new AdminUpdateService(eb, wr, passwordService),
  inject: [EventBus, AdminWriteRepository, PasswordService],
};
