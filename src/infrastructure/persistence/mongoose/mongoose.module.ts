import * as process from 'process';
import { Global, Module } from '@nestjs/common';
import { MongooseModule as MongooseNestModule } from '@nestjs/mongoose';
import { AdminModule } from './modules/admin/admin.module';

@Global()
@Module({
  imports: [
    MongooseNestModule.forRoot(
      `mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@${process.env.MONGO_INITDB_HOST}`,
    ),
    AdminModule,
  ],
  exports: [AdminModule],
})
export class MongooseModule {}
