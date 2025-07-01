import { Module } from '@nestjs/common';
import { PasswordModule } from '@infrastructure/password';
import { UserService } from '@core/app/components/user/user.service';
import { UserController } from './user.controller';
import { EventBus, EventBusModule } from '@infrastructure/event-bus';
import { EventBus as EventBusPort } from '@core/app/common/ports/event-bus.port';
import { UserWriteRepository as UserWriteRepositoryPort } from '@core/domain/components/user/repository/user-write-repository.port';
import { UserReadRepository as UserReadRepositoryPort } from '@core/domain/components/user/repository/user-read-repository.port';
import { IdService } from '@core/app/common/ports/id.service.port';
import { PasswordService } from '@core/app/common/ports/password-service.port';
import { TmpFileStorage } from '@core/app/common/ports/file-storages/tmp-file-storage.port';
import { UserFileStorage } from '@core/app/common/ports/file-storages/user-file-storage.port';
import { UserId } from '@core/domain/components/user/types';
import { MongooseModule } from '@infrastructure/mongoose';
import { UserModule } from '@infrastructure/mongoose/services/user/user.module';
import { UserWriteRepository } from '@infrastructure/mongoose/services/user/user-write-repository.service';
import { UserReadRepository } from '@infrastructure/mongoose/services/user/user-read-repository.service';
import { GetUserHandler } from '../../commands/get-user.handler';
import { QueryBusModule } from '@infrastructure/query-bus';

@Module({
  imports: [PasswordModule, QueryBusModule],
  providers: [
    {
      provide: UserService,
      useFactory: (
        eb: EventBusPort,
        wr: UserWriteRepositoryPort,
        rr: UserReadRepositoryPort,
        idService: IdService<UserId>,
        passService: PasswordService,
        tmpFS: TmpFileStorage,
        useFS: UserFileStorage,
      ) => {
        return new UserService(eb, wr, rr, idService, passService, tmpFS, useFS);
      },
      inject: [EventBus, UserWriteRepository, UserReadRepository],
    },
    GetUserHandler,
  ],
  controllers: [UserController],
})
export class UserModule {}
