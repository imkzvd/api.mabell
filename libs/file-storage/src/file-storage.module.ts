import { Module } from '@nestjs/common';
import { CacheModule } from '@api.mabell/cache';
import { ArtistFileStorage } from './services/artist-file-storage.service';
import { TmpFileStorage } from './services/tmp-file-storage.service';
import { UserFileStorage } from './services/user-file-storage.service';

@Module({
  imports: [CacheModule],
  providers: [ArtistFileStorage, TmpFileStorage, UserFileStorage],
  exports: [ArtistFileStorage, TmpFileStorage, UserFileStorage],
})
export class FileStorageModule {}
