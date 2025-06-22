import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserRefreshToken, UserRefreshTokenSchema } from './user-refresh-token.schema';
import { UserRefreshTokenWriteRepositoryAdapter } from './user-refresh-token-write-repository.adapter';
import { UserRefreshTokenReadRepositoryAdapter } from './user-refresh-token-read-repository.adapter';
import { USER_REFRESH_TOKEN_WRITE_REPOSITORY_DI_TOKEN } from '../../../../../core/domain/components/user-refresh-token/user-refresh-token-write-repository.port';
import { USER_REFRESH_TOKEN_READ_REPOSITORY_DI_TOKEN } from '../../../../../core/domain/components/user-refresh-token/user-refresh-token-read-repository.port';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: UserRefreshToken.name, schema: UserRefreshTokenSchema }]),
  ],
  providers: [
    {
      provide: USER_REFRESH_TOKEN_WRITE_REPOSITORY_DI_TOKEN,
      useClass: UserRefreshTokenWriteRepositoryAdapter,
    },
    {
      provide: USER_REFRESH_TOKEN_READ_REPOSITORY_DI_TOKEN,
      useClass: UserRefreshTokenReadRepositoryAdapter,
    },
  ],
  exports: [
    {
      provide: USER_REFRESH_TOKEN_WRITE_REPOSITORY_DI_TOKEN,
      useClass: UserRefreshTokenWriteRepositoryAdapter,
    },
    {
      provide: USER_REFRESH_TOKEN_READ_REPOSITORY_DI_TOKEN,
      useClass: UserRefreshTokenReadRepositoryAdapter,
    },
  ],
})
export class UserRefreshTokenModule {}
