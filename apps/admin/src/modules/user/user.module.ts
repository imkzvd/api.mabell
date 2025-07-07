import { Module } from '@nestjs/common';
import { RandomIdModule } from '@infrastructure/random-id';
import { PasswordModule } from '@infrastructure/password';
import { FileStorageModule } from '@infrastructure/file-storage';
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
import { userServiceProvider } from '../../providers/user-service.provider';

@Module({
  imports: [RandomIdModule, FileStorageModule, PasswordModule],
  providers: [
    userServiceProvider,
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
