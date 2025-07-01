import { Module } from '@nestjs/common';
import { UserService } from '@core/app/components/user/user.service';
import { EventBus as EventBusPort } from '@core/app/common/ports/event-bus.port';
import { UserWriteRepository as UserWriteRepositoryPort } from '@core/domain/components/user/repository/user-write-repository.port';
import { UserReadRepository as UserReadRepositoryPort } from '@core/domain/components/user/repository/user-read-repository.port';
import { IdService as IdServicePort } from '@core/app/common/ports/id.service.port';
import { PasswordService as PasswordServicePort } from '@core/app/common/ports/password-service.port';
import { TmpFileStorage as TmpFileStoragePort } from '@core/app/common/ports/file-storages/tmp-file-storage.port';
import { UserFileStorage as UserFileStoragePort } from '@core/app/common/ports/file-storages/user-file-storage.port';
import { UserId } from '@core/domain/components/user/types';
import { EventBus } from '@infrastructure/event-bus';
import { UserWriteRepository } from '@infrastructure/mongoose/services/user/user-write-repository.service';
import { UserReadRepository } from '@infrastructure/mongoose/services/user/user-read-repository.service';
import { RandomIdModule, RandomIdService } from '@infrastructure/random-id';
import { PasswordModule, PasswordService } from '@infrastructure/password';
import { FileStorageModule, TmpFileStorage, UserFileStorage } from '@infrastructure/file-storage';
import { UserController } from './user.controller';
import { CreateUserHandler } from './commands/create-user.handler';
import { DeleteUserHandler } from './commands/delete-user.handler';
import { DeleteUserAvatarHandler } from './commands/delete-user-avatar.handler';
import { RefreshUserPasswordHandler } from './commands/refresh-user-password.handler';
import { UpdateUserHandler } from './commands/update-user.handler';
import { UpdateUserAvatarHandler } from './commands/update-user-avatar.handler';
import { UpdateUserEmailHandler } from './commands/update-user-email.handler';
import { UpdateUserUsernameHandler } from './commands/update-user-username.handler';
import { GetUserHandler } from './queries/get-user.handler';

@Module({
  imports: [PasswordModule, RandomIdModule, FileStorageModule],
  providers: [
    {
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
    },
    CreateUserHandler,
    DeleteUserHandler,
    DeleteUserAvatarHandler,
    RefreshUserPasswordHandler,
    UpdateUserHandler,
    UpdateUserAvatarHandler,
    UpdateUserEmailHandler,
    UpdateUserUsernameHandler,
    GetUserHandler,
  ],
  controllers: [UserController],
})
export class UserModule {}
