import { Module } from '@nestjs/common';
import { TMP_FILE_STORAGE_DI_TOKEN } from '../../../core/app/components/upload/storage/tmp-file-storage.port';
import { TmpFileStorageAdapter } from './tmp-file-storage.adapter';

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
