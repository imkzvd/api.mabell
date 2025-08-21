import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
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
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const host = configService.get<string>('database.host');
        const port = configService.get<number>('database.port');
        const username = configService.get<string>('database.username');
        const password = configService.get<string>('database.password');
        const name = configService.get<string>('database.name');

        return { uri: `mongodb://${username}:${password}@${host}:${port}/${name}` };
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
export class DBModule {}
