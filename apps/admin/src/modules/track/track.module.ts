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
import { albumVerifyServiceProvider } from '../album/providers/album-verify-service.provider';
import { albumServiceProvider } from '../album/providers/album-service.provider';
import { trackCreateServiceProvider } from './providers/track-create-service.provider';
import { trackDeleteServiceProvider } from './providers/track-delete-service.provider';
import { trackUpdateServiceProvider } from './providers/track-update-service.provider';
import { artistVerifyServiceProvider } from '../artist/providers/artist-verify-service.provider';
import { trackServiceProvider } from './providers/track-service.provider';

@Module({
  imports: [RandomIdModule, FileStorageModule],
  providers: [
    albumVerifyServiceProvider,
    albumServiceProvider,
    trackCreateServiceProvider,
    trackDeleteServiceProvider,
    trackUpdateServiceProvider,
    artistVerifyServiceProvider,
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
