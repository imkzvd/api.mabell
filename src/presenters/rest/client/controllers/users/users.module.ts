import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { GetUserHandler } from '../../../../../core/app/components/user/queries/get-user/get-user.handler';
import { UserService } from '../../../../../core/app/components/user/user.service';
import { PasswordModule } from '../../../../../infrastructure/security/password/password.module';

@Module({
  imports: [PasswordModule],
  providers: [UserService, GetUserHandler],
  controllers: [UsersController],
})
export class UsersModule {}
