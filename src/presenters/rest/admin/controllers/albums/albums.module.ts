import { Module } from '@nestjs/common';
import { AlbumsController } from './albums.controller';
import { GetAlbumTracksHandler } from '../../../../../core/app/components/track/queries/get-album-tracks/get-album-tracks.handler';
import { AlbumService } from '../../../../../core/app/components/album/album.service';
import { AlbumSubscriber } from '../../../../../core/app/components/album/events/album.subscriber';
import { TrackService } from '../../../../../core/app/components/track/track.service';
import { ArtistService } from '../../../../../core/app/components/artist/artist.service';
import { CreateAlbumHandler } from '../../../../../core/app/cqrs/album/commands/create-album/create-album.handler';
import { DeleteAlbumHandler } from '../../../../../core/app/cqrs/album/commands/delete-album/delete-album.handler';
import { DeleteAlbumCoverHandler } from '../../../../../core/app/cqrs/album/commands/delete-album-cover/delete-album-cover.handler';
import { UpdateAlbumArtistsHandler } from '../../../../../core/app/cqrs/album/commands/update-album-artists/update-album-artists.handler';
import { UpdateAlbumHandler } from '../../../../../core/app/cqrs/album/commands/update-album/update-album.handler';
import { UpdateAlbumCoverHandler } from '../../../../../core/app/cqrs/album/commands/update-album-cover/update-album-cover.handler';
import { GetAlbumHandler } from '../../../../../core/app/cqrs/album/queries/get-album/get-album.handler';

@Module({
  providers: [
    ArtistService,
    AlbumService,
    TrackService,
    AlbumSubscriber,
    CreateAlbumHandler,
    DeleteAlbumHandler,
    DeleteAlbumCoverHandler,
    UpdateAlbumArtistsHandler,
    UpdateAlbumHandler,
    UpdateAlbumCoverHandler,
    GetAlbumHandler,
    GetAlbumTracksHandler,
  ],
  controllers: [AlbumsController],
})
export class AlbumsModule {}
