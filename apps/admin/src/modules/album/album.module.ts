import { Module } from '@nestjs/common';
import { RandomIdModule } from '@api.mabell/random-id';
import { FileStorageModule } from '@api.mabell/file-storage';
import { AlbumController } from './album.controller';
import { CreateAlbumHandler } from './commands/create-album.handler';
import { DeleteAlbumHandler } from './commands/delete-album.handler';
import { DeleteAlbumCoverHandler } from './commands/delete-album-cover.handler';
import { UpdateAlbumArtistsHandler } from './commands/update-album-artists.handler';
import { UpdateAlbumHandler } from './commands/update-album.handler';
import { UpdateAlbumCoverHandler } from './commands/update-album-cover.handler';
import { GetAlbumHandler } from './queries/get-album.handler';
import { GetAlbumTracksHandler } from '../track/queries/get-album-tracks.handler';
import { artistVerifyServiceProvider } from '../artist/providers/artist-verify-service.provider';
import { albumCreateServiceProvider } from './providers/album-create-service.provider';
import { albumDeleteServiceProvider } from './providers/album-delete-service.provider';
import { albumUpdateServiceProvider } from './providers/album-update-service.provider';
import { albumServiceProvider } from './providers/album-service.provider';
import { albumVerifyServiceProvider } from './providers/album-verify-service.provider';
import { trackServiceProvider } from '../track/providers/track-service.provider';
import { AlbumEventSubscriber } from './events/album.event-subscriber';

@Module({
  imports: [RandomIdModule, FileStorageModule],
  providers: [
    artistVerifyServiceProvider,
    albumCreateServiceProvider,
    albumDeleteServiceProvider,
    albumUpdateServiceProvider,
    albumServiceProvider,
    albumVerifyServiceProvider,
    trackServiceProvider,
    CreateAlbumHandler,
    DeleteAlbumHandler,
    DeleteAlbumCoverHandler,
    UpdateAlbumArtistsHandler,
    UpdateAlbumHandler,
    UpdateAlbumCoverHandler,
    GetAlbumHandler,
    GetAlbumTracksHandler,
    AlbumEventSubscriber,
  ],
  controllers: [AlbumController],
})
export class AlbumModule {}
