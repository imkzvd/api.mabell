import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ConfigModule } from '@nestjs/config';
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
import { LoginModule } from './controllers/login/login.module';
import { SessionModule } from './controllers/session/session.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: path.join(process.cwd(), 'tmp'),
      serveRoot: '/tmp',
    }),
    ServeStaticModule.forRoot({
      rootPath: path.join(process.cwd(), 'storages'),
      serveRoot: '/storages',
    }),
    ConfigModule.forRoot(),
    CqrsModule.forRoot(),
    MongooseModule,
    InMemoryEventBusModule,
    StorageModule,
    IdModule,
    LoginModule,
    MetadataModule,
    UploadsModule,
    AdminsModule,
    UsersModule,
    ArtistsModule,
    AlbumsModule,
    TracksModule,
    PlaylistsModule,
    SearchModule,
    SessionModule,
  ],
})
export class AdminAppModule {}
