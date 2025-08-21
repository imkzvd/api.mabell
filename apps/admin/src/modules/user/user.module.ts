import { Module } from '@nestjs/common';
import { RandomIdModule } from '@api.mabell/random-id';
import { PasswordModule } from '@api.mabell/password';
import { FileStorageModule } from '@api.mabell/file-storage';
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
import { userCreateServiceProvider } from './providers/user-create-service.provider';
import { userDeleteServiceProvider } from './providers/user-delete-service.provider';
import { userUpdateServiceProvider } from './providers/user-update-service.provider';
import { userFindServiceProvider } from './providers/user-find-service.provider';

@Module({
  imports: [RandomIdModule, FileStorageModule, PasswordModule],
  providers: [
    userCreateServiceProvider,
    userDeleteServiceProvider,
    userUpdateServiceProvider,
    userFindServiceProvider,
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
