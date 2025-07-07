import { Provider } from '@nestjs/common';
import { UserService } from '@core/app/components/user/user.service';
import { EventBus as EventBusPort } from '@core/app/common/ports/event-bus.port';
import { UserWriteRepository as UserWriteRepositoryPort } from '@core/domain/components/user/repository/user-write-repository.port';
import { UserReadRepository as UserReadRepositoryPort } from '@core/domain/components/user/repository/user-read-repository.port';
import { IdService as IdServicePort } from '@core/app/common/ports/id.service.port';
import { UserId } from '@core/domain/components/user/types';
import { PasswordService as PasswordServicePort } from '@core/app/common/ports/password-service.port';
import { TmpFileStorage as TmpFileStoragePort } from '@core/app/common/ports/file-storages/tmp-file-storage.port';
import { UserFileStorage as UserFileStoragePort } from '@core/app/common/ports/file-storages/user-file-storage.port';
import { EventBus } from '@infrastructure/event-bus';
import { UserWriteRepository } from '@infrastructure/mongoose/services/user/user-write-repository.service';
import { UserReadRepository } from '@infrastructure/mongoose/services/user/user-read-repository.service';
import { RandomIdService } from '@infrastructure/random-id';
import { PasswordService } from '@infrastructure/password';
import { TmpFileStorage, UserFileStorage } from '@infrastructure/file-storage';

export const userServiceProvider: Provider = {
  provide: UserService,
  useFactory: (
    eb: EventBusPort,
    wr: UserWriteRepositoryPort,
    rr: UserReadRepositoryPort,
    idService: IdServicePort<UserId>,
    passwordService: PasswordServicePort,
    tmpFS: TmpFileStoragePort,
    userFS: UserFileStoragePort,
  ) => new UserService(eb, wr, rr, idService, passwordService, tmpFS, userFS),
  inject: [
    EventBus,
    UserWriteRepository,
    UserReadRepository,
    RandomIdService,
    PasswordService,
    TmpFileStorage,
    UserFileStorage,
  ],
};
