import { Module } from '@nestjs/common';
import { RandomIdModule } from '@infrastructure/random-id';
import { FileStorageModule } from '@infrastructure/file-storage';
import { TrackController } from './track.controller';
import { CreateTrackHandler } from './commands/create-track.handler';
import { DeleteTrackHandler } from './commands/delete-track.handler';
import { DeleteTrackFileHandler } from './commands/delete-track-file.handler';
import { UpdateTrackHandler } from './commands/update-track.handler';
import { UpdateTrackFeatArtistsHandler } from './commands/update-track-feat-artists.handler';
import { UpdateTrackFileHandler } from './commands/update-track-file.handler';
import { GetTrackHandler } from './queries/get-track.handler';
import { artistServiceProvider } from '../artist/providers/artist-service.provider';
import { albumServiceProvider } from '../album/providers/album-service.provider';
import { trackServiceProvider } from './providers/track-service.provider';

@Module({
  imports: [RandomIdModule, FileStorageModule],
  providers: [
    artistServiceProvider,
    albumServiceProvider,
    trackServiceProvider,
    CreateTrackHandler,
    DeleteTrackHandler,
    DeleteTrackFileHandler,
    UpdateTrackHandler,
    UpdateTrackFeatArtistsHandler,
    UpdateTrackFileHandler,
    GetTrackHandler,
  ],
  controllers: [TrackController],
})
export class TrackModule {}
