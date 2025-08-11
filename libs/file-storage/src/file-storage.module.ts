import { Module } from '@nestjs/common';
import { RedisModule } from '@api.mabell/redis';
import { ArtistFileStorage } from './services/artist-file-storage.service';
import { TmpFileStorage } from './services/tmp-file-storage.service';
import { UserFileStorage } from './services/user-file-storage.service';

@Module({
  imports: [RedisModule],
  providers: [ArtistFileStorage, TmpFileStorage, UserFileStorage],
  exports: [ArtistFileStorage, TmpFileStorage, UserFileStorage],
})
export class FileStorageModule {}
