import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';
import { MongooseModule } from '../../../infrastructure/persistence/mongoose/mongoose.module';
import { AdminsModule } from './controllers/admins/admins.module';
import { UploadsModule } from './controllers/uploads/uploads.module';
import { UsersModule } from './controllers/users/users.module';
import { ArtistsModule } from './controllers/artists/artists.module';
import { AlbumsModule } from './controllers/albums/albums.module';
import { TracksModule } from './controllers/tracks/tracks.module';
import { IdModule } from '../../../infrastructure/services/id/id.module';
import { MetadataModule } from './controllers/metadata/metadata.module';
import { InMemoryEventBusModule } from '../../../infrastructure/event-bus/in-memory-event-bus/in-memory-event-bus.module';
import { StorageModule } from '../../../infrastructure/storage/storage.module';
import { PlaylistsModule } from './controllers/playlists/playlists.module';
import { SearchModule } from './controllers/search/search.module';
import { AuthModule } from './controllers/auth/auth.module';
import { SessionModule } from './controllers/session/session.module';
import { AccessTokenStrategy } from './strategies/access-token.strategy';
import { AccessTokenGuard } from './guards/access-token.guard';
import { RolesGuard } from './guards/roles.guard';
import { MeModule } from './controllers/me/me.module';
import appConfig from './config/app.config';
import corsConfig from './config/cors.config';
import databaseConfig from './config/database.config';
import jwtConfig from './config/jwt.config';
import mailConfig from './config/mail.config';
import redisConfig from './config/redis.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
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
    CqrsModule.forRoot(),
    MongooseModule,
    InMemoryEventBusModule,
    StorageModule,
    IdModule,
    AuthModule,
    MeModule,
    AdminsModule,
    UsersModule,
    ArtistsModule,
    AlbumsModule,
    TracksModule,
    PlaylistsModule,
    SearchModule,
    SessionModule,
    UploadsModule,
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
export class AdminAppModule {}
