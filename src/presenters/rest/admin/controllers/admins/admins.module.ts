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
import { GetOwnerTokensHandler } from '../../../../../core/app/cqrs/token/queries/get-owner-tokens/get-owner-tokens.handler';
import { TokenService } from '../../../../../core/app/components/token/token.service';
import { JWTModule } from '../../../../../infrastructure/security/jwt/jwt.module';

@Module({
  imports: [PasswordModule, JWTModule],
  providers: [
    AdminService,
    TokenService,
    CreateAdminHandler,
    UpdateAdminHandler,
    UpdateAdminUsernameHandler,
    RefreshAdminPasswordHandler,
    DeleteAdminHandler,
    GetAdminsHandler,
    GetAdminHandler,
    GetOwnerTokensHandler,
  ],
  controllers: [AdminsController],
})
export class AdminsModule {}
