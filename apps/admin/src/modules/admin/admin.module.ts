import { Module } from '@nestjs/common';
import { AdminService } from '@core/app/components/admin/admin.service';
import { EventBus as EventBusPort } from '@core/app/common/ports/event-bus.port';
import { AdminWriteRepository as AdminWriteRepositoryPort } from '@core/domain/components/admin/repository/admin-write-repository.port';
import { AdminReadRepository as AdminReadRepositoryPort } from '@core/domain/components/admin/repository/admin-read-repository.port';
import { IdService as IdServicePort } from '@core/app/common/ports/id.service.port';
import { AdminId } from '@core/domain/components/admin/types';
import { PasswordService as PasswordServicePort } from '@core/app/common/ports/password-service.port';
import { PasswordModule, PasswordService } from '@infrastructure/password';
import { RandomIdModule, RandomIdService } from '@infrastructure/random-id';
import { EventBus } from '@infrastructure/event-bus';
import { AdminWriteRepository } from '@infrastructure/mongoose/services/admin/admin-write-repository.service';
import { AdminReadRepository } from '@infrastructure/mongoose/services/admin/admin-read-repository.service';
import { AdminController } from './admin.controller';
import { CreateAdminHandler } from './commands/create-admin.handler';
import { UpdateAdminHandler } from './commands/update-admin.handler';
import { UpdateAdminUsernameHandler } from './commands/update-admin-username.handler';
import { RefreshAdminPasswordHandler } from './commands/refresh-admin-password.handler';
import { DeleteAdminHandler } from './commands/delete-admin.handler';
import { GetAdminsHandler } from './queries/get-admins.handler';
import { GetAdminHandler } from './queries/get-admin.handler';

@Module({
  imports: [PasswordModule, RandomIdModule],
  providers: [
    {
      provide: AdminService,
      useFactory: (
        eb: EventBusPort,
        wr: AdminWriteRepositoryPort,
        rr: AdminReadRepositoryPort,
        idService: IdServicePort<AdminId>,
        passwordService: PasswordServicePort,
      ) => new AdminService(eb, wr, rr, idService, passwordService),
      inject: [
        EventBus,
        AdminWriteRepository,
        AdminReadRepository,
        RandomIdService,
        PasswordService,
      ],
    },
    CreateAdminHandler,
    UpdateAdminHandler,
    UpdateAdminUsernameHandler,
    RefreshAdminPasswordHandler,
    DeleteAdminHandler,
    GetAdminsHandler,
    GetAdminHandler,
  ],
  controllers: [AdminController],
})
export class AdminModule {}
