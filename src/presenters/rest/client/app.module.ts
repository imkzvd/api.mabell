import * as path from 'path';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MongooseModule } from '../../../infrastructure/persistence/mongoose/mongoose.module';
import { UsersModule } from './controllers/users/users.module';
import { ArtistsModule } from './controllers/artists/artists.module';

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
    UsersModule,
    ArtistsModule,
  ],
})
export class ClientAppModule {}
