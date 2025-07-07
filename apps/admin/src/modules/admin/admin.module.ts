import { Module } from '@nestjs/common';
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
import { DeleteRefreshTokenOnUserBlockedHandler } from '../../events/delete-refresh-token-on-user-blocked.handlers';
import { adminServiceProvider } from './providers/admin-service.provider';

@Module({
  imports: [PasswordModule, RandomIdModule],
  providers: [
    adminServiceProvider,
    CreateAdminHandler,
    UpdateAdminHandler,
    UpdateAdminUsernameHandler,
    RefreshAdminPasswordHandler,
    DeleteAdminHandler,
    GetAdminsHandler,
    GetAdminHandler,
    DeleteRefreshTokenOnUserBlockedHandler,
  ],
  controllers: [AdminController],
})
export class AdminModule {}
