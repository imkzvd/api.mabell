import { Module } from '@nestjs/common';
import { USER_FILE_STORAGE_DI_TOKEN } from '../../../core/app/components/user/ports/storage/user-file-storage.port';
import { UserFileStorageAdapter } from './user-file-storage.adapter';

@Module({
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
