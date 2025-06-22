import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminRefreshToken, AdminRefreshTokenSchema } from './admin-refresh-token.schema';
import { AdminRefreshTokenWriteRepository } from './admin-refresh-token-write-repository.service';
import { AdminRefreshTokenReadRepository } from './admin-refresh-token-read-repository.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: AdminRefreshToken.name, schema: AdminRefreshTokenSchema }]),
  ],
  providers: [AdminRefreshTokenWriteRepository, AdminRefreshTokenReadRepository],
  exports: [AdminRefreshTokenWriteRepository, AdminRefreshTokenReadRepository],
})
export class AdminRefreshTokenModule {}
