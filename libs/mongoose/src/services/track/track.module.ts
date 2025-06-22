import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Track, TrackSchema } from './track.schema';
import { TrackWriteRepository } from './track-write-repository.service';
import { TrackReadRepository } from './track-read-repository.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Track.name, schema: TrackSchema }])],
  providers: [TrackWriteRepository, TrackReadRepository],
  exports: [TrackWriteRepository, TrackReadRepository],
})
export class TrackModule {}
