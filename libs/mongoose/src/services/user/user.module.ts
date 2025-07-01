import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.schema';
import { UserWriteRepository } from './user-write-repository.service';
import { UserReadRepository } from './user-read-repository.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  providers: [UserWriteRepository, UserReadRepository],
  exports: [UserWriteRepository, UserReadRepository],
})
export class UserModule {}
