import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Admin, AdminSchema } from './admin.schema';
import { AdminWriteRepositoryAdapter } from './admin-write-repository.adapter';
import { AdminReadRepositoryAdapter } from './admin-read-repository.adapter';
import { ADMIN_WRITE_REPOSITORY_DI_TOKEN } from '../../../../../core/domain/components/admin/repository/admin-write-repository.port';
import { ADMIN_READ_REPOSITORY_DI_TOKEN } from '../../../../../core/domain/components/admin/repository/admin-read-repository.port';

@Module({
  imports: [MongooseModule.forFeature([{ name: Admin.name, schema: AdminSchema }])],
  providers: [
    { provide: ADMIN_WRITE_REPOSITORY_DI_TOKEN, useClass: AdminWriteRepositoryAdapter },
    { provide: ADMIN_READ_REPOSITORY_DI_TOKEN, useClass: AdminReadRepositoryAdapter },
  ],
  exports: [
    { provide: ADMIN_WRITE_REPOSITORY_DI_TOKEN, useClass: AdminWriteRepositoryAdapter },
    { provide: ADMIN_READ_REPOSITORY_DI_TOKEN, useClass: AdminReadRepositoryAdapter },
  ],
})
export class AdminModule {}
