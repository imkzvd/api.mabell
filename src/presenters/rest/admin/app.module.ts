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
    AdminsModule,
    UploadsModule,
    UsersModule,
    ArtistsModule,
    AlbumsModule,
    TracksModule,
  ],
})
export class AdminAppModule {}
