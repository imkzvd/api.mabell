import { Module } from '@nestjs/common';
import { RandomIdModule } from '@api.mabell/random-id';
import { FileStorageModule } from '@api.mabell/file-storage';
import { TrackController } from './track.controller';
import { GetTrackHandler } from './queries/get-track.handler';
import { trackServiceProvider } from './providers/track-service.provider';

@Module({
  imports: [RandomIdModule, FileStorageModule],
  providers: [trackServiceProvider, GetTrackHandler],
  controllers: [TrackController],
})
export class TrackModule {}
