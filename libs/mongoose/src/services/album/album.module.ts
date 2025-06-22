import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Album, AlbumSchema } from './album.schema';
import { AlbumWriteRepository } from './album-write-repository.service';
import { AlbumReadRepository } from './album-read-repository.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Album.name, schema: AlbumSchema }])],
  providers: [AlbumWriteRepository, AlbumReadRepository],
  exports: [AlbumWriteRepository, AlbumReadRepository],
})
export class AlbumModule {}
