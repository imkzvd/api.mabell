import { Provider } from '@nestjs/common';
import { AdminService } from '@core/app/components/admin/services/admin.service';
import { EventBus as EventBusPort } from '@core/app/common/ports/event-bus.port';
import { AdminWriteRepository as AdminWriteRepositoryPort } from '@core/domain/components/admin/repository/admin-write-repository.port';
import { AdminReadRepository as AdminReadRepositoryPort } from '@core/domain/components/admin/repository/admin-read-repository.port';
import { IdService as IdServicePort } from '@core/app/common/ports/id.service.port';
import { AdminId } from '@core/domain/components/admin/types';
import { PasswordService as PasswordServicePort } from '@core/app/common/ports/password-service.port';
import { EventBus } from '@infrastructure/event-bus';
import { AdminWriteRepository } from '@infrastructure/mongoose/services/admin/admin-write-repository.service';
import { AdminReadRepository } from '@infrastructure/mongoose/services/admin/admin-read-repository.service';
import { RandomIdService } from '@infrastructure/random-id';
import { PasswordService } from '@infrastructure/password';

export const adminServiceProvider: Provider = {
  provide: AdminService,
  useFactory: (
    eb: EventBusPort,
    wr: AdminWriteRepositoryPort,
    rr: AdminReadRepositoryPort,
    idService: IdServicePort<AdminId>,
    passwordService: PasswordServicePort,
  ) => new AdminService(eb, wr, rr, idService, passwordService),
  inject: [EventBus, AdminWriteRepository, AdminReadRepository, RandomIdService, PasswordService],
};
