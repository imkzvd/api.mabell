import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Admin, AdminSchema } from './admin.schema';
import { AdminWriteRepository } from './admin-write-repository.service';
import { AdminReadRepository } from './admin-read-repository.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Admin.name, schema: AdminSchema }])],
  providers: [AdminWriteRepository, AdminReadRepository],
  exports: [AdminWriteRepository, AdminReadRepository],
})
export class AdminModule {}
