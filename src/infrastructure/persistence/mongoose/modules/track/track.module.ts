import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Track } from './track.document';
import { TrackSchema } from './track.schema';
import { Album } from '../album/album.document';
import { AlbumSchema } from '../album/album.schema';
import { TRACK_WRITE_REPOSITORY_DI_TOKEN } from '../../../../../core/domain/components/track/repository/track-write-repository.port';
import { TRACK_READ_REPOSITORY_DI_TOKEN } from '../../../../../core/app/components/track/ports/repository/track-read-repository.port';
import { TrackWriteRepositoryAdapter } from './track-write-repository.adapter';
import { TrackReadRepositoryAdapter } from './track-read-repository.adapter';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Track.name, schema: TrackSchema },
      { name: Album.name, schema: AlbumSchema },
    ]),
  ],
  providers: [
    { provide: TRACK_WRITE_REPOSITORY_DI_TOKEN, useClass: TrackWriteRepositoryAdapter },
    { provide: TRACK_READ_REPOSITORY_DI_TOKEN, useClass: TrackReadRepositoryAdapter },
  ],
  exports: [
    { provide: TRACK_WRITE_REPOSITORY_DI_TOKEN, useClass: TrackWriteRepositoryAdapter },
    { provide: TRACK_READ_REPOSITORY_DI_TOKEN, useClass: TrackReadRepositoryAdapter },
  ],
})
export class TrackModule {}
