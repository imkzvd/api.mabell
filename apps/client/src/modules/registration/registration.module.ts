import { Module } from '@nestjs/common';
import { PasswordModule } from '@api.mabell/password';
import { RegistrationController } from './registration.controller';
import { userRegistrationServiceProvider } from '../user/providers/user-registration-service.provider';
import { RegisterUserHandler } from './commands/register-user.handler';
import { GetUserHandler } from '../user/queries/get-user.handler';
import { userFindServiceProvider } from '../user/providers/user-find-service.provider';

@Module({
  imports: [PasswordModule],
  providers: [
    userRegistrationServiceProvider,
    userFindServiceProvider,
    RegisterUserHandler,
    GetUserHandler,
  ],
  controllers: [RegistrationController],
})
export class RegistrationModule {}
