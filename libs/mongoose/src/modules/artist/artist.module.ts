import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Artist, ArtistSchema } from './artist.schema';
import { ARTIST_WRITE_REPOSITORY_DI_TOKEN } from '../../../../../core/domain/components/artist/repository/artist-write-repository.port';
import { ArtistWriteRepositoryAdapter } from './artist-write-repository.adapter';
import { ArtistReadRepositoryAdapter } from './artist-read-repository.adapter';
import { ARTIST_READ_REPOSITORY_DI_TOKEN } from '../../../../../core/domain/components/artist/repository/artist-read-repository.port';

@Module({
  imports: [MongooseModule.forFeature([{ name: Artist.name, schema: ArtistSchema }])],
  providers: [
    { provide: ARTIST_WRITE_REPOSITORY_DI_TOKEN, useClass: ArtistWriteRepositoryAdapter },
    { provide: ARTIST_READ_REPOSITORY_DI_TOKEN, useClass: ArtistReadRepositoryAdapter },
  ],
  exports: [
    { provide: ARTIST_WRITE_REPOSITORY_DI_TOKEN, useClass: ArtistWriteRepositoryAdapter },
    { provide: ARTIST_READ_REPOSITORY_DI_TOKEN, useClass: ArtistReadRepositoryAdapter },
  ],
})
export class ArtistModule {}
