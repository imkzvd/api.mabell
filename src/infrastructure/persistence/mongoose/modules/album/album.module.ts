import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Album } from './album.document';
import { AlbumSchema } from './album.schema';
import { ALBUM_WRITE_REPOSITORY_DI_TOKEN } from '../../../../../core/domain/components/album/repository/album-write-repository.port';
import { AlbumWriteRepositoryAdapter } from './album-write-repository.adapter';
import { AlbumReadRepositoryAdapter } from './album-read-repository.adapter';
import { ALBUM_READ_REPOSITORY_DI_TOKEN } from '../../../../../core/app/components/album/ports/repository/album-read-repository.port';

@Module({
  imports: [MongooseModule.forFeature([{ name: Album.name, schema: AlbumSchema }])],
  providers: [
    { provide: ALBUM_WRITE_REPOSITORY_DI_TOKEN, useClass: AlbumWriteRepositoryAdapter },
    { provide: ALBUM_READ_REPOSITORY_DI_TOKEN, useClass: AlbumReadRepositoryAdapter },
  ],
  exports: [
    { provide: ALBUM_WRITE_REPOSITORY_DI_TOKEN, useClass: AlbumWriteRepositoryAdapter },
    { provide: ALBUM_READ_REPOSITORY_DI_TOKEN, useClass: AlbumReadRepositoryAdapter },
  ],
})
export class AlbumModule {}
