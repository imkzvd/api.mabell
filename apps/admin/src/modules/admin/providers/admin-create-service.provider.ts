import { Provider } from '@nestjs/common';
import { EventBus as EventBusPort } from '@core/app/common/ports/event-bus.port';
import { AdminWriteRepository as AdminWriteRepositoryPort } from '@core/domain/components/admin/repository/admin-write-repository.port';
import { IdService as IdServicePort } from '@core/app/common/ports/id.service.port';
import { AdminId } from '@core/domain/components/admin/types';
import { PasswordService as PasswordServicePort } from '@core/app/common/ports/password-service.port';
import { EventBus } from '@infrastructure/event-bus';
import { AdminWriteRepository } from '@infrastructure/mongoose/services/admin/admin-write-repository.service';
import { RandomIdService } from '@infrastructure/random-id';
import { PasswordService } from '@infrastructure/password';
import { AdminCreateService } from '@core/app/components/admin/services/admin-create.service';

export const adminCreateServiceProvider: Provider = {
  provide: AdminCreateService,
  useFactory: (
    eb: EventBusPort,
    wr: AdminWriteRepositoryPort,
    idService: IdServicePort<AdminId>,
    passwordService: PasswordServicePort,
  ) => new AdminCreateService(eb, wr, idService, passwordService),
  inject: [EventBus, AdminWriteRepository, RandomIdService, PasswordService],
};
