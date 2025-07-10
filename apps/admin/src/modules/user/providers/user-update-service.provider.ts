import { Provider } from '@nestjs/common';
import { EventBus as EventBusPort } from '@core/app/common/ports/event-bus.port';
import { UserWriteRepository as UserWriteRepositoryPort } from '@core/domain/components/user/repository/user-write-repository.port';
import { PasswordService as PasswordServicePort } from '@core/app/common/ports/password-service.port';
import { TmpFileStorage as TmpFileStoragePort } from '@core/app/common/ports/file-storages/tmp-file-storage.port';
import { UserFileStorage as UserFileStoragePort } from '@core/app/common/ports/file-storages/user-file-storage.port';
import { EventBus } from '@infrastructure/event-bus';
import { UserWriteRepository } from '@infrastructure/mongoose/services/user/user-write-repository.service';
import { PasswordService } from '@infrastructure/password';
import { TmpFileStorage, UserFileStorage } from '@infrastructure/file-storage';
import { UserUpdateService } from '@core/app/components/user/services/user-update.service';

export const userUpdateServiceProvider: Provider = {
  provide: UserUpdateService,
  useFactory: (
    eb: EventBusPort,
    wr: UserWriteRepositoryPort,
    passwordService: PasswordServicePort,
    tmpFS: TmpFileStoragePort,
    userFS: UserFileStoragePort,
  ) => new UserUpdateService(eb, wr, passwordService, tmpFS, userFS),
  inject: [EventBus, UserWriteRepository, PasswordService, TmpFileStorage, UserFileStorage],
};
