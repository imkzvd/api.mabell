import { Module } from '@nestjs/common';
import { JWTModule } from '@api.mabell/jwt';
import { PasswordModule } from '@infrastructure/password';
import { RandomIdModule } from '@infrastructure/random-id';
import { AdminController } from './admin.controller';
import { CreateAdminHandler } from './commands/create-admin.handler';
import { UpdateAdminHandler } from './commands/update-admin.handler';
import { UpdateAdminUsernameHandler } from './commands/update-admin-username.handler';
import { RefreshAdminPasswordHandler } from './commands/refresh-admin-password.handler';
import { DeleteAdminHandler } from './commands/delete-admin.handler';
import { GetAdminsHandler } from './queries/get-admins.handler';
import { GetAdminHandler } from './queries/get-admin.handler';
import { adminServiceProvider } from './providers/admin-service.provider';
import { adminTokenServiceProvider } from './providers/admin-token-service.provider';
import { adminCreateServiceProvider } from './providers/admin-create-service.provider';
import { adminUpdateServiceProvider } from './providers/admin-update-service.provider';
import { adminDeleteServiceProvider } from './providers/admin-delete-service.provider';
import { adminTokenDeleteServiceProvider } from './providers/admin-token-delete-service.provider';
import { AdminTokenEventSubscriber } from './events/admin-token.event-subscriber';

@Module({
  imports: [PasswordModule, RandomIdModule, JWTModule],
  providers: [
    adminCreateServiceProvider,
    adminUpdateServiceProvider,
    adminDeleteServiceProvider,
    adminServiceProvider,
    adminTokenServiceProvider,
    adminTokenDeleteServiceProvider,
    CreateAdminHandler,
    UpdateAdminHandler,
    UpdateAdminUsernameHandler,
    RefreshAdminPasswordHandler,
    DeleteAdminHandler,
    GetAdminsHandler,
    GetAdminHandler,
    AdminTokenEventSubscriber,
  ],
  controllers: [AdminController],
})
export class AdminModule {}
