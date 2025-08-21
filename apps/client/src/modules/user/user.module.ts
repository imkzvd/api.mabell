import { Module } from '@nestjs/common';
import { PasswordModule } from '@api.mabell/password';
import { FileStorageModule } from '@api.mabell/file-storage';
import { GetUserHandler } from './queries/get-user.handler';
import { UserController } from './user.controller';
import { userServiceProvider } from './providers/user-service.provider';

@Module({
  imports: [PasswordModule, FileStorageModule],
  providers: [userServiceProvider, GetUserHandler],
  controllers: [UserController],
})
export class UserModule {}
