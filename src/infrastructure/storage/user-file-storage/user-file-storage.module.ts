import { Module } from '@nestjs/common';
import { UserFileStorageAdapter } from './user-file-storage.adapter';
import { TmpFileStorageModule } from '../tmp-fs-storage/tmp-file-storage.module';
import { USER_FILE_STORAGE_DI_TOKEN } from '../../../core/app/common/ports/file-storages/user-file-storage.port';

@Module({
  imports: [TmpFileStorageModule],
  providers: [
    {
      provide: USER_FILE_STORAGE_DI_TOKEN,
      useClass: UserFileStorageAdapter,
    },
  ],
  exports: [
    {
      provide: USER_FILE_STORAGE_DI_TOKEN,
      useClass: UserFileStorageAdapter,
    },
  ],
})
export class UserFileStorageModule {}
