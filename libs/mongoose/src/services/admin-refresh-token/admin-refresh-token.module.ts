import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminRefreshToken, AdminRefreshTokenSchema } from './admin-refresh-token.schema';
import { ADMIN_REFRESH_TOKEN_WRITE_REPOSITORY_DI_TOKEN } from '../../../../../core/domain/components/admin-refresh-token/repository/admin-refresh-token-write-repository.port';
import { AdminRefreshTokenWriteRepositoryAdapter } from './admin-refresh-token-write-repository.adapter';
import { ADMIN_REFRESH_TOKEN_READ_REPOSITORY_DI_TOKEN } from '../../../../../core/domain/components/admin-refresh-token/repository/admin-refresh-token-read-repository.port';
import { AdminRefreshTokenReadRepositoryAdapter } from './admin-refresh-token-read-repository.adapter';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: AdminRefreshToken.name, schema: AdminRefreshTokenSchema }]),
  ],
  providers: [
    {
      provide: ADMIN_REFRESH_TOKEN_WRITE_REPOSITORY_DI_TOKEN,
      useClass: AdminRefreshTokenWriteRepositoryAdapter,
    },
    {
      provide: ADMIN_REFRESH_TOKEN_READ_REPOSITORY_DI_TOKEN,
      useClass: AdminRefreshTokenReadRepositoryAdapter,
    },
  ],
  exports: [
    {
      provide: ADMIN_REFRESH_TOKEN_WRITE_REPOSITORY_DI_TOKEN,
      useClass: AdminRefreshTokenWriteRepositoryAdapter,
    },
    {
      provide: ADMIN_REFRESH_TOKEN_READ_REPOSITORY_DI_TOKEN,
      useClass: AdminRefreshTokenReadRepositoryAdapter,
    },
  ],
})
export class AdminRefreshTokenModule {}
