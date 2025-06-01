import { Module } from '@nestjs/common';
import { AdminsController } from './admins.controller';
import { PasswordModule } from '../../../../../infrastructure/security/password/password.module';
import { AdminService } from '../../../../../core/app/components/admin/admin.service';
import { CreateAdminHandler } from '../../../../../core/app/cqrs/admin/commands/create-admin/create-admin.handler';
import { UpdateAdminHandler } from '../../../../../core/app/cqrs/admin/commands/update-admin/update-admin.handler';
import { UpdateAdminUsernameHandler } from '../../../../../core/app/cqrs/admin/commands/update-admin-username/update-admin-username.handler';
import { RefreshAdminPasswordHandler } from '../../../../../core/app/cqrs/admin/commands/refresh-admin-password/refresh-admin-password.handler';
import { DeleteAdminHandler } from '../../../../../core/app/cqrs/admin/commands/delete-admin/delete-admin.handler';
import { GetAdminsHandler } from '../../../../../core/app/cqrs/admin/queries/get-admins/get-admins.handler';
import { GetAdminHandler } from '../../../../../core/app/cqrs/admin/queries/get-admin/get-admin.handler';

@Module({
  imports: [PasswordModule],
  providers: [
    AdminService,
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
