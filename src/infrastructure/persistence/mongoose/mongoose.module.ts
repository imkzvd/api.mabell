import * as process from 'process';
import { Global, Module } from '@nestjs/common';
import { MongooseModule as MongooseNestModule } from '@nestjs/mongoose';
import { AdminModule } from './modules/admin/admin.module';
import { UserModule } from './modules/user/user.module';
import { ArtistModule } from './modules/artist/artist.module';

@Global()
@Module({
  imports: [
    MongooseNestModule.forRoot(
      `mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@${process.env.MONGO_INITDB_HOST}`,
    ),
    AdminModule,
    UserModule,
    ArtistModule,
  ],
  exports: [AdminModule, UserModule, ArtistModule],
})
export class MongooseModule {}
