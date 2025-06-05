import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { PasswordModule } from '../../../../../infrastructure/security/password/password.module';
import { UserService } from '../../../../../core/app/components/user/user.service';
import { CreateUserHandler } from '../../../../../core/app/cqrs/user/commands/create-user/create-user.handler';
import { RegisterUserHandler } from '../../../../../core/app/cqrs/user/commands/register-user/register-user.handler';
import { UpdateUserHandler } from '../../../../../core/app/cqrs/user/commands/update-user/update-user.handler';
import { UpdateUserUsernameHandler } from '../../../../../core/app/cqrs/user/commands/update-user-username/update-user-username.handler';
import { UpdateUserEmailHandler } from '../../../../../core/app/cqrs/user/commands/update-user-email/update-user-email.handler';
import { UpdateUserPasswordHandler } from '../../../../../core/app/cqrs/user/commands/update-user-password/update-user-password.handler';
import { RefreshUserPasswordHandler } from '../../../../../core/app/cqrs/user/commands/refresh-user-password/refresh-user-password.handler';
import { UpdateUserAvatarHandler } from '../../../../../core/app/cqrs/user/commands/update-user-avatar/update-user-avatar.handler';
import { DeleteUserAvatarHandler } from '../../../../../core/app/cqrs/user/commands/delete-user-avatar/delete-user-avatar.handler';
import { DeleteUserHandler } from '../../../../../core/app/cqrs/user/commands/delete-user/delete-user.handler';
import { GetUserHandler } from '../../../../../core/app/cqrs/user/queries/get-user/get-user.handler';

@Module({
  imports: [PasswordModule],
  providers: [
    UserService,
    CreateUserHandler,
    RegisterUserHandler,
    UpdateUserHandler,
    UpdateUserUsernameHandler,
    UpdateUserEmailHandler,
    UpdateUserPasswordHandler,
    RefreshUserPasswordHandler,
    UpdateUserAvatarHandler,
    DeleteUserAvatarHandler,
    DeleteUserHandler,
    GetUserHandler,
  ],
  controllers: [UsersController],
})
export class UsersModule {}
