import { Provider } from '@nestjs/common';
import { EventBus as EventBusPort } from '@core/app/common/ports/event-bus.port';
import { UserWriteRepository as UserWriteRepositoryPort } from '@core/domain/components/user/repository/user-write-repository.port';
import { IdService as IdServicePort } from '@core/app/common/ports/id.service.port';
import { UserId } from '@core/domain/components/user/types';
import { PasswordService as PasswordServicePort } from '@core/app/common/ports/password-service.port';
import { EventBus } from '@infrastructure/event-bus';
import { UserWriteRepository } from '@infrastructure/mongoose/services/user/user-write-repository.service';
import { RandomIdService } from '@infrastructure/random-id';
import { PasswordService } from '@infrastructure/password';
import { UserCreateService } from '@core/app/components/user/services/user-create.service';

export const userCreateServiceProvider: Provider = {
  provide: UserCreateService,
  useFactory: (
    eb: EventBusPort,
    wr: UserWriteRepositoryPort,
    idService: IdServicePort<UserId>,
    passwordService: PasswordServicePort,
  ) => new UserCreateService(eb, wr, idService, passwordService),
  inject: [EventBus, UserWriteRepository, RandomIdService, PasswordService],
};
