import { Module } from '@nestjs/common';
import { ArtistsController } from './artists.controller';
import { GetArtistHandler } from '../../../../../core/app/components/artist/queries/get-artist/get-artist.handler';
import { GetArtistAlbumsHandler } from '../../../../../core/app/components/album/queries/get-artist-albums/get-artist-albums.handler';
import { GetArtistPublicStatusHandler } from '../../../../../core/app/components/artist/queries/get-artist-public-status/get-artist-public-status.handler';
import { GetArtistTracksHandler } from '../../../../../core/app/components/track/queries/get-artist-tracks/get-artist-tracks.handler';
import { ArtistService } from '../../../../../core/app/components/artist/artist.service';
import { AlbumService } from '../../../../../core/app/components/album/album.service';
import { TrackService } from '../../../../../core/app/components/track/track.service';

@Module({
  providers: [
    ArtistService,
    AlbumService,
    TrackService,
    GetArtistHandler,
    GetArtistPublicStatusHandler,
    GetArtistAlbumsHandler,
    GetArtistTracksHandler,
  ],
  controllers: [ArtistsController],
})
export class ArtistsModule {}
