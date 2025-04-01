import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User } from './user.document';
import { UserSchema } from './user.schema';
import { UserWriteRepositoryAdapter } from './user-write-repository.adapter';
import { UserReadRepositoryAdapter } from './user-read-repository.adapter';
import { USER_WRITE_REPOSITORY_DI_TOKEN } from '../../../../../core/domain/components/user/repository/user-write-repository.port';
import { USER_READ_REPOSITORY_DI_TOKEN } from '../../../../../core/app/components/user/ports/repository/user-read-repository.port';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  providers: [
    { provide: USER_WRITE_REPOSITORY_DI_TOKEN, useClass: UserWriteRepositoryAdapter },
    { provide: USER_READ_REPOSITORY_DI_TOKEN, useClass: UserReadRepositoryAdapter },
  ],
  exports: [
    { provide: USER_WRITE_REPOSITORY_DI_TOKEN, useClass: UserWriteRepositoryAdapter },
    { provide: USER_READ_REPOSITORY_DI_TOKEN, useClass: UserReadRepositoryAdapter },
  ],
})
export class UserModule {}
