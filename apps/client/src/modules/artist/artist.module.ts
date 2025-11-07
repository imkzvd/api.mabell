import { Module } from '@nestjs/common';
import { RandomIdModule } from '@api.mabell/random-id';
import { FileStorageModule } from '@api.mabell/file-storage';
import { ArtistController } from './artist.controller';
import { GetArtistHandler } from './queries/get-artist.handler';
import { artistServiceProvider } from './providers/artist-service.provider';
import { GetArtistTracksHandler } from '../track/queries/get-artist-tracks.handler';
import { artistVerifyServiceProvider } from './providers/artist-verify-service.provider';
import { trackServiceProvider } from '../track/providers/track-service.provider';
import { albumServiceProvider } from '../album/providers/album-service.provider';
import { GetArtistAlbumsHandler } from '../album/queries/get-artist-albums.handler';
import { GetArtistLatestAlbumHandler } from './queries/get-artist-latest-album.handler';
import { GetSimilarArtistsHandler } from './queries/get-similar-artists.handler';
import { GetArtistsByIdsHandler } from './queries/get-artists-by-ids.handler';

@Module({
  imports: [RandomIdModule, FileStorageModule],
  providers: [
    artistServiceProvider,
    artistVerifyServiceProvider,
    albumServiceProvider,
    trackServiceProvider,
    GetArtistHandler,
    GetArtistsByIdsHandler,
    GetArtistAlbumsHandler,
    GetArtistTracksHandler,
    GetArtistLatestAlbumHandler,
    GetSimilarArtistsHandler,
  ],
  controllers: [ArtistController],
})
export class ArtistModule {}
