import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import * as path from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { CqrsModule } from '@api.mabell/cqrs';
import { EventBusModule } from '@api.mabell/event-bus';
import { DBModule } from '@api.mabell/db';
import appConfig from './configs/app.config';
import corsConfig from './configs/cors.config';
import databaseConfig from './configs/database.config';
import jwtConfig from './configs/jwt.config';
import mailConfig from './configs/mail.config';
import redisConfig from './configs/redis.config';
import { UserModule } from './modules/user/user.module';
import { UploadModule } from './modules/upload/upload.module';
import { MeModule } from './modules/me/me.module';
import { AdminModule } from './modules/admin/admin.module';
import { AuthModule } from './modules/auth/auth.module';
import { AccessTokenStrategy } from './strategies/access-token.strategy';
import { AccessTokenGuard } from './guards/access-token.guard';
import { RolesGuard } from './guards/roles.guard';
import { ArtistModule } from './modules/artist/artist.module';
import { AlbumModule } from './modules/album/album.module';
import { TrackModule } from './modules/track/track.module';
import { MetadataModule } from './modules/metadata/metadata.module';
import { PlaylistModule } from './modules/playlist/playlist.module';
// import { SessionModule } from './modules/session/session.module';
import { SearchModule } from './modules/search/search.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [appConfig, corsConfig, databaseConfig, jwtConfig, mailConfig, redisConfig],
    }),
    ServeStaticModule.forRoot({
      rootPath: path.join(process.cwd(), 'tmp'),
      serveRoot: '/tmp',
    }),
    ServeStaticModule.forRoot({
      rootPath: path.join(process.cwd(), 'storages'),
      serveRoot: '/storages',
    }),
    ConfigModule.forRoot(),
    EventBusModule,
    DBModule,
    CqrsModule,
    AuthModule,
    MeModule,
    AdminModule,
    UserModule,
    ArtistModule,
    AlbumModule,
    TrackModule,
    PlaylistModule,
    SearchModule,
    // SessionModule,
    UploadModule,
    MetadataModule,
  ],
  providers: [
    AccessTokenStrategy,
    {
      provide: APP_GUARD,
      useClass: AccessTokenGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
