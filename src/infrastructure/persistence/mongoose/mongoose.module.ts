import * as process from 'process';
import { Global, Module } from '@nestjs/common';
import { MongooseModule as MongooseNestModule } from '@nestjs/mongoose';
import { AdminModule } from './modules/admin/admin.module';
import { UserModule } from './modules/user/user.module';
import { ArtistModule } from './modules/artist/artist.module';
import { AlbumModule } from './modules/album/album.module';
import { TrackModule } from './modules/track/track.module';
import { PlaylistModule } from './modules/playlist/playlist.module';

@Global()
@Module({
  imports: [
    MongooseNestModule.forRoot(
      `mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@${process.env.MONGO_INITDB_HOST}`,
    ),
    AdminModule,
    UserModule,
    ArtistModule,
    AlbumModule,
    TrackModule,
    PlaylistModule,
  ],
  exports: [AdminModule, UserModule, ArtistModule, AlbumModule, TrackModule, PlaylistModule],
})
export class MongooseModule {}
