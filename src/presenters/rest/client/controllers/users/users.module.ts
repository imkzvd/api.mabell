import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { GetUserHandler } from '../../../../../core/app/components/user/queries/get-user/get-user.handler';

@Module({
  providers: [GetUserHandler],
  controllers: [UsersController],
})
export class UsersModule {}
