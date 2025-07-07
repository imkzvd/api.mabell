import { Module } from '@nestjs/common';
import { RandomIdModule } from '@infrastructure/random-id';
import { FileStorageModule } from '@infrastructure/file-storage';
import { ArtistController } from './artist.controller';
import { CreateArtistHandler } from './commands/create-artist.handler';
import { UpdateArtistHandler } from './commands/update-artist.handler';
import { UpdateArtistAvatarHandler } from './commands/update-artist-avatar.handler';
import { UpdateArtistCoverHandler } from './commands/update-artist-cover.handler';
import { DeleteArtistAvatarHandler } from './commands/delete-artist-avatar.handler';
import { DeleteArtistCoverHandler } from './commands/delete-artist-cover.handler';
import { GetArtistTracksHandler } from '../track/queries/get-artist-tracks.handler';
import { DeleteArtistHandler } from './commands/delete-artist.handler';
import { GetArtistHandler } from './queries/get-artist.handler';
import { GetArtistAlbumsHandler } from '../album/queries/get-artist-albums.handler';
import { artistServiceProvider } from '../../providers/artist-service.provider';
import { albumServiceProvider } from '../../providers/album-service.provider';
import { trackServiceProvider } from '../../providers/track-service.provider';

@Module({
  imports: [RandomIdModule, FileStorageModule],
  providers: [
    artistServiceProvider,
    albumServiceProvider,
    trackServiceProvider,
    CreateArtistHandler,
    UpdateArtistHandler,
    UpdateArtistAvatarHandler,
    UpdateArtistCoverHandler,
    DeleteArtistAvatarHandler,
    DeleteArtistCoverHandler,
    DeleteArtistHandler,
    GetArtistHandler,
    GetArtistAlbumsHandler,
    GetArtistTracksHandler,
  ],
  controllers: [ArtistController],
})
export class ArtistModule {}
