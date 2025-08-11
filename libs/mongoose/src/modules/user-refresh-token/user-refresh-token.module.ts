import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserRefreshToken, UserRefreshTokenSchema } from './user-refresh-token.schema';
import { UserRefreshTokenWriteRepository } from './user-refresh-token-write-repository.service';
import { UserRefreshTokenReadRepository } from './user-refresh-token-read-repository.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: UserRefreshToken.name, schema: UserRefreshTokenSchema }]),
  ],
  providers: [UserRefreshTokenWriteRepository, UserRefreshTokenReadRepository],
  exports: [UserRefreshTokenWriteRepository, UserRefreshTokenReadRepository],
})
export class UserRefreshTokenModule {}
