import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { GetUserByIdHandler } from '../../../../../core/app/components/user/queries/get-user-by-id/get-user-by-id.handler';

@Module({
  providers: [GetUserByIdHandler],
  controllers: [UsersController],
})
export class UsersModule {}
