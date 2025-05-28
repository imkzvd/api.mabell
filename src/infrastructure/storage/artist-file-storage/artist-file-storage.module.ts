import { Module } from '@nestjs/common';
import { ArtistFileStorageAdapter } from './artist-file-storage.adapter';
import { TmpFileStorageModule } from '../tmp-fs-storage/tmp-file-storage.module';
import { ARTIST_FILE_STORAGE_DI_TOKEN } from '../../../core/app/common/ports/file-storages/artist-file-storage.port';

@Module({
  imports: [TmpFileStorageModule],
  providers: [
    {
      provide: ARTIST_FILE_STORAGE_DI_TOKEN,
      useClass: ArtistFileStorageAdapter,
    },
  ],
  exports: [
    {
      provide: ARTIST_FILE_STORAGE_DI_TOKEN,
      useClass: ArtistFileStorageAdapter,
    },
  ],
})
export class ArtistFileStorageModule {}
