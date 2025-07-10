import { Provider } from '@nestjs/common';
import { EventBus as EventBusPort } from '@core/app/common/ports/event-bus.port';
import { AdminWriteRepository as AdminWriteRepositoryPort } from '@core/domain/components/admin/repository/admin-write-repository.port';
import { EventBus } from '@infrastructure/event-bus';
import { AdminWriteRepository } from '@infrastructure/mongoose/services/admin/admin-write-repository.service';
import { AdminDeleteService } from '@core/app/components/admin/services/admin-delete.service';

export const adminDeleteServiceProvider: Provider = {
  provide: AdminDeleteService,
  useFactory: (eb: EventBusPort, wr: AdminWriteRepositoryPort) => new AdminDeleteService(eb, wr),
  inject: [EventBus, AdminWriteRepository],
};
