import * as path from 'path';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MongooseModule } from '../../../infrastructure/persistence/mongoose/mongoose.module';
import { UsersModule } from './controllers/users/users.module';
import { ArtistsModule } from './controllers/artists/artists.module';
import { IdModule } from '../../../infrastructure/services/id/id.module';
import { StorageModule } from '../../../infrastructure/storage/storage.module';
import { InMemoryEventBusModule } from '../../../infrastructure/event-bus/in-memory-event-bus/in-memory-event-bus.module';
import { LoginModule } from './controllers/login/login.module';

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
    IdModule,
    InMemoryEventBusModule,
    StorageModule,
    MongooseModule,
    LoginModule,
    UsersModule,
    ArtistsModule,
  ],
})
export class ClientAppModule {}
