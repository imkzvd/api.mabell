import { Provider } from '@nestjs/common';
import { EventBus as EventBusPort } from '@core/app/common/ports/event-bus.port';
import { UserWriteRepository as UserWriteRepositoryPort } from '@core/domain/components/user/repository/user-write-repository.port';
import { UserFileStorage as UserFileStoragePort } from '@core/app/common/ports/file-storages/user-file-storage.port';
import { EventBus } from '@infrastructure/event-bus';
import { UserWriteRepository } from '@infrastructure/mongoose/services/user/user-write-repository.service';
import { UserFileStorage } from '@infrastructure/file-storage';
import { UserDeleteService } from '@core/app/components/user/services/user-delete.service';

export const userDeleteServiceProvider: Provider = {
  provide: UserDeleteService,
  useFactory: (eb: EventBusPort, wr: UserWriteRepositoryPort, userFS: UserFileStoragePort) =>
    new UserDeleteService(eb, wr, userFS),
  inject: [EventBus, UserWriteRepository, UserFileStorage],
};
