import { Global, Module } from '@nestjs/common';
import { MongooseModule as MongooseNestModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { AdminModule } from './modules/admin/admin.module';
import { UserModule } from './modules/user/user.module';
import { ArtistModule } from './modules/artist/artist.module';
import { AlbumModule } from './modules/album/album.module';
import { TrackModule } from './modules/track/track.module';
import { PlaylistModule } from './modules/playlist/playlist.module';
import { AdminRefreshTokenModule } from './modules/admin-refresh-token/admin-refresh-token.module';
import { UserRefreshTokenModule } from './modules/user-refresh-token/user-refresh-token.module';

@Global()
@Module({
  imports: [
    MongooseNestModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const host = configService.get<string>('database.host');
        const port = configService.get<number>('database.port');
        const user = configService.get<string>('database.user');
        const password = configService.get<string>('database.password');

        return {
          uri: `mongodb://${user}:${password}@${host}:${port}`,
        };
      },
    }),
    AdminModule,
    UserModule,
    ArtistModule,
    AlbumModule,
    TrackModule,
    PlaylistModule,
    AdminRefreshTokenModule,
    UserRefreshTokenModule,
  ],
  exports: [
    AdminModule,
    UserModule,
    ArtistModule,
    AlbumModule,
    TrackModule,
    PlaylistModule,
    AdminRefreshTokenModule,
    UserRefreshTokenModule,
  ],
})
export class MongooseModule {}
