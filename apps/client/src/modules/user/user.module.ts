import { Module } from '@nestjs/common';
import { PasswordModule } from '@infrastructure/password';
import { QueryBusModule } from '@infrastructure/query-bus';
import { FileStorageModule } from '@infrastructure/file-storage';
import { GetUserHandler } from './queries/get-user.handler';
import { UserController } from './user.controller';
import { userServiceProvider } from '../../providers/user-service.provider';

@Module({
  imports: [PasswordModule, QueryBusModule, FileStorageModule],
  providers: [userServiceProvider, GetUserHandler],
  controllers: [UserController],
})
export class UserModule {}
