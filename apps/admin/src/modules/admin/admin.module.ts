import { Module } from '@nestjs/common';
import { JWTModule } from '@infrastructure/jwt';
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
import { adminFindServiceProvider } from '../../providers/admin-service.provider';
import { adminTokenServiceProvider } from '../../providers/admin-token-service.provider';
import { adminCreateServiceProvider } from '../../providers/admin-create-service.provider';
import { adminUpdateServiceProvider } from '../../providers/admin-update-service.provider';
import { adminDeleteServiceProvider } from '../../providers/admin-delete-service.provider';

@Module({
  imports: [PasswordModule, RandomIdModule, JWTModule],
  providers: [
    adminCreateServiceProvider,
    adminUpdateServiceProvider,
    adminDeleteServiceProvider,
    adminFindServiceProvider,
    adminTokenServiceProvider,
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
