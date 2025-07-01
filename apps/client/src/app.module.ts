import * as path from 'path';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { UsersModule } from './controllers/users/users.module';
import { MongooseModule } from '@infrastructure/mongoose';
import { EventBusModule } from '@infrastructure/event-bus';
import { CommandBusModule } from '@infrastructure/command-bus';
import appConfig from './configs/app.config';
import corsConfig from './configs/cors.config';
import databaseConfig from './configs/database.config';
import jwtConfig from './configs/jwt.config';
import mailConfig from './configs/mail.config';
import redisConfig from './configs/redis.config';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env.client',
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
    CqrsModule.forRoot(),
    MongooseModule,
    EventBusModule,
    CommandBusModule,
    AuthModule,
    UsersModule,
  ],
})
export class AppModule {}
