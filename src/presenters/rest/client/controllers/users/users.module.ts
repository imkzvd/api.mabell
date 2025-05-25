import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { GetUserHandler } from '../../../../../core/app/components/user/queries/get-user/get-user.handler';
import { UserService } from '../../../../../core/app/components/user/user.service';
import { PasswordModule } from '../../../../../infrastructure/security/password/password.module';
import { TmpFileStorageModule } from '../../../../../infrastructure/storage/tmp-fs-storage/tmp-file-storage.module';
import { UserFileStorageModule } from '../../../../../infrastructure/storage/user-file-storage/user-file-storage.module';

@Module({
  imports: [PasswordModule, TmpFileStorageModule, UserFileStorageModule],
  providers: [UserService, GetUserHandler],
  controllers: [UsersController],
})
export class UsersModule {}
