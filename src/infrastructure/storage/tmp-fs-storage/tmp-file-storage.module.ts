import { Module } from '@nestjs/common';
import { TmpFileStorageAdapter } from './tmp-file-storage.adapter';
import { TMP_FILE_STORAGE_DI_TOKEN } from '../../../core/app/common/ports/file-storages/tmp-file-storage.port';

@Module({
  providers: [
    {
      provide: TMP_FILE_STORAGE_DI_TOKEN,
      useClass: TmpFileStorageAdapter,
    },
  ],
  exports: [
    {
      provide: TMP_FILE_STORAGE_DI_TOKEN,
      useClass: TmpFileStorageAdapter,
    },
  ],
})
export class TmpFileStorageModule {}
