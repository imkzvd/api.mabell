import { Global, Module } from '@nestjs/common';
import { MongooseModule as MongooseNestModule } from '@nestjs/mongoose';
import { AdminModule } from './modules/admin/admin.module';

@Global()
@Module({
  imports: [MongooseNestModule.forRoot('###'), AdminModule],
  exports: [AdminModule],
})
export class MongooseModule {}
