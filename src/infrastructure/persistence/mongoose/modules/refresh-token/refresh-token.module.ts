import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RefreshToken, RefreshTokenSchema } from './refresh-token.schema';
import { REFRESH_TOKEN_WRITE_REPOSITORY_DI_TOKEN } from '../../../../../core/domain/components/refresh-token/repository/refresh-token-write-repository.port';
import { RefreshTokenWriteRepositoryAdapter } from './refresh-token-write-repository.adapter';
import { REFRESH_TOKEN_READ_REPOSITORY_DI_TOKEN } from '../../../../../core/domain/components/refresh-token/repository/refresh-token-read-repository.port';
import { RefreshTokenReadRepositoryAdapter } from './refresh-token-read-repository.adapter';

@Module({
  imports: [MongooseModule.forFeature([{ name: RefreshToken.name, schema: RefreshTokenSchema }])],
  providers: [
    {
      provide: REFRESH_TOKEN_WRITE_REPOSITORY_DI_TOKEN,
      useClass: RefreshTokenWriteRepositoryAdapter,
    },
    {
      provide: REFRESH_TOKEN_READ_REPOSITORY_DI_TOKEN,
      useClass: RefreshTokenReadRepositoryAdapter,
    },
  ],
  exports: [
    {
      provide: REFRESH_TOKEN_WRITE_REPOSITORY_DI_TOKEN,
      useClass: RefreshTokenWriteRepositoryAdapter,
    },
    {
      provide: REFRESH_TOKEN_READ_REPOSITORY_DI_TOKEN,
      useClass: RefreshTokenReadRepositoryAdapter,
    },
  ],
})
export class RefreshTokenModule {}
