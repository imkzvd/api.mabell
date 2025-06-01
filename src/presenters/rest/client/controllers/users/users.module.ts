import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UserService } from '../../../../../core/app/components/user/user.service';
import { PasswordModule } from '../../../../../infrastructure/security/password/password.module';
import { GetUserHandler } from '../../../../../core/app/cqrs/user/queries/get-user/get-user.handler';

@Module({
  imports: [PasswordModule],
  providers: [UserService, GetUserHandler],
  controllers: [UsersController],
})
export class UsersModule {}
