import { Module } from '@nestjs/common';
import { ArtistFileStorage } from '@infrastructure/file-storage/services/artist-file-storage.service';
import { TmpFileStorage } from '@infrastructure/file-storage/services/tmp-file-storage.service';
import { UserFileStorage } from '@infrastructure/file-storage/services/user-file-storage.service';
import { RedisModule } from '@infrastructure/redis';

@Module({
  imports: [RedisModule],
  providers: [ArtistFileStorage, TmpFileStorage, UserFileStorage],
  exports: [ArtistFileStorage, TmpFileStorage, UserFileStorage],
})
export class FileStorageModule {}
