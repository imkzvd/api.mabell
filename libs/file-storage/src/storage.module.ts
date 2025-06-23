import { Global, Module } from '@nestjs/common';
import { ARTIST_FILE_STORAGE_DI_TOKEN } from '../../core/app/common/ports/file-storages/artist-file-storage.port';
import { ArtistFileStorageAdapter } from './artist-file-storage.adapter';
import { USER_FILE_STORAGE_DI_TOKEN } from '../../core/app/common/ports/file-storages/user-file-storage.port';
import { UserFileStorageAdapter } from './user-file-storage.adapter';
import { TMP_FILE_STORAGE_DI_TOKEN } from '../../core/app/common/ports/file-storages/tmp-file-storage.port';
import { TmpFileStorageAdapter } from './tmp-file-storage.adapter';

@Global()
@Module({
  providers: [
    {
      provide: TMP_FILE_STORAGE_DI_TOKEN,
      useClass: TmpFileStorageAdapter,
    },
    {
      provide: ARTIST_FILE_STORAGE_DI_TOKEN,
      useClass: ArtistFileStorageAdapter,
    },
    {
      provide: USER_FILE_STORAGE_DI_TOKEN,
      useClass: UserFileStorageAdapter,
    },
  ],
  exports: [
    {
      provide: TMP_FILE_STORAGE_DI_TOKEN,
      useClass: TmpFileStorageAdapter,
    },
    {
      provide: ARTIST_FILE_STORAGE_DI_TOKEN,
      useClass: ArtistFileStorageAdapter,
    },
    {
      provide: USER_FILE_STORAGE_DI_TOKEN,
      useClass: UserFileStorageAdapter,
    },
  ],
})
export class StorageModule {}
