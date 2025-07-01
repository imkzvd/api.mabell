import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Artist, ArtistSchema } from './artist.schema';
import { ArtistWriteRepository } from './artist-write-repository.service';
import { ArtistReadRepository } from './artist-read-repository.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Artist.name, schema: ArtistSchema }])],
  providers: [ArtistWriteRepository, ArtistReadRepository],
  exports: [ArtistWriteRepository, ArtistReadRepository],
})
export class ArtistModule {}
