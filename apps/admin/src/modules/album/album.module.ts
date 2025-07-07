import { Module } from '@nestjs/common';
import { RandomIdModule } from '@infrastructure/random-id';
import { FileStorageModule } from '@infrastructure/file-storage';
import { AlbumController } from './album.controller';
import { CreateAlbumHandler } from './commands/create-album.handler';
import { DeleteAlbumHandler } from './commands/delete-album.handler';
import { DeleteAlbumCoverHandler } from './commands/delete-album-cover.handler';
import { UpdateAlbumArtistsHandler } from './commands/update-album-artists.handler';
import { UpdateAlbumHandler } from './commands/update-album.handler';
import { UpdateAlbumCoverHandler } from './commands/update-album-cover.handler';
import { GetAlbumHandler } from './queries/get-album.handler';
import { GetAlbumTracksHandler } from '../track/queries/get-album-tracks.handler';
import { artistServiceProvider } from '../artist/providers/artist-service.provider';
import { albumServiceProvider } from './providers/album-service.provider';
import { trackServiceProvider } from '../track/providers/track-service.provider';

@Module({
  imports: [RandomIdModule, FileStorageModule],
  providers: [
    artistServiceProvider,
    albumServiceProvider,
    trackServiceProvider,
    CreateAlbumHandler,
    DeleteAlbumHandler,
    DeleteAlbumCoverHandler,
    UpdateAlbumArtistsHandler,
    UpdateAlbumHandler,
    UpdateAlbumCoverHandler,
    GetAlbumHandler,
    GetAlbumTracksHandler,
    // AlbumEventSubscriber,
  ],
  controllers: [AlbumController],
})
export class AlbumModule {}
