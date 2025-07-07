import { Module } from '@nestjs/common';
import { PasswordModule } from '@infrastructure/password';
import { QueryBusModule } from '@infrastructure/query-bus';
import { GetUserHandler } from './queries/get-user.handler';
import { UserController } from './user.controller';
import { userServiceProvider } from '../../providers/user-service.provider';

@Module({
  imports: [PasswordModule, QueryBusModule],
  providers: [userServiceProvider, GetUserHandler],
  controllers: [UserController],
})
export class UserModule {}
