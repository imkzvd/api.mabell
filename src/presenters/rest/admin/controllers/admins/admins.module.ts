import { Module } from '@nestjs/common';
import { AdminsController } from './admins.controller';
import { PasswordModule } from '../../../../../infrastructure/security/password/password.module';
import { CreateAdminHandler } from '../../../../../core/app/components/admin/commands/create-admin/create-admin.handler';
import { UpdateAdminHandler } from '../../../../../core/app/components/admin/commands/update-admin/update-admin.handler';
import { UpdateAdminUsernameHandler } from '../../../../../core/app/components/admin/commands/update-admin-username/update-admin-username.handler';
import { RefreshAdminPasswordHandler } from '../../../../../core/app/components/admin/commands/refresh-admin-password/refresh-admin-password.handler';
import { DeleteAdminHandler } from '../../../../../core/app/components/admin/commands/delete-admin/delete-admin.handler';
import { GetAdminsHandler } from '../../../../../core/app/components/admin/queries/get-admins/get-admins.handler';
import { GetAdminHandler } from '../../../../../core/app/components/admin/queries/get-admin/get-admin.handler';

@Module({
  imports: [PasswordModule],
  providers: [
    CreateAdminHandler,
    UpdateAdminHandler,
    UpdateAdminUsernameHandler,
    RefreshAdminPasswordHandler,
    DeleteAdminHandler,
    GetAdminsHandler,
    GetAdminHandler,
  ],
  controllers: [AdminsController],
})
export class AdminsModule {}
